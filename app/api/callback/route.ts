import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const targetRepo = process.env.GITHUB_REPO || "45ish/Madhav-Sewa-Sansthan";
  const allowedOrigin = process.env.OAUTH_ALLOWED_ORIGIN || "*";

  if (error || !code) {
    const msg = errorDescription || error || "No authorization code received from GitHub.";
    return renderResponse(false, msg, allowedOrigin);
  }

  if (!clientId || !clientSecret) {
    return renderResponse(
      false,
      "Server configuration error: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is missing.",
      allowedOrigin
    );
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Decap-CMS-OAuth",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return renderResponse(
        false,
        tokenData.error_description || "Failed to retrieve GitHub access token.",
        allowedOrigin
      );
    }

    // 2. Fetch authenticated GitHub user details
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Decap-CMS-OAuth",
      },
    });

    if (!userRes.ok) {
      return renderResponse(false, "Failed to authenticate GitHub user.", allowedOrigin);
    }

    const userData = await userRes.json();
    const username = userData.login;

    // 3. Verify user has collaborator write access on the repository
    const permRes = await fetch(
      `https://api.github.com/repos/${targetRepo}/collaborators/${username}/permission`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Decap-CMS-OAuth",
        },
      }
    );

    if (permRes.status === 404 || permRes.status === 403) {
      return renderResponse(
        false,
        `Access Denied: GitHub account '${username}' is not a recognized collaborator of ${targetRepo}.`,
        allowedOrigin
      );
    }

    const permData = await permRes.json();
    const permission = permData.permission; // "admin" | "write" | "read" | "none"
    const hasWriteAccess =
      permission === "admin" ||
      permission === "write" ||
      permData?.permissions?.push === true;

    if (!hasWriteAccess) {
      return renderResponse(
        false,
        `Access Denied: Account '${username}' does not have write or publish permissions on ${targetRepo}.`,
        allowedOrigin
      );
    }

    // 4. Authorized successfully! Return postMessage handshake for Decap CMS
    return renderResponse(true, accessToken, allowedOrigin);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal authentication error";
    return renderResponse(false, message, allowedOrigin);
  }
}

function renderResponse(success: boolean, payload: string, allowedOrigin: string) {
  if (success) {
    const successData = JSON.stringify({
      token: payload,
      provider: "github",
    });

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Authorizing Decap CMS...</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #FBF5EA; color: #1F2A5C;">
  <div style="text-align: center; padding: 2rem;">
    <h2>Authentication Successful</h2>
    <p>Connecting to Decap CMS. You can close this window if it does not close automatically.</p>
  </div>
  <script>
    (function () {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:${successData}',
          e.origin
        );
        setTimeout(function() { window.close(); }, 300);
      }
      window.addEventListener("message", receiveMessage, false);
      if (window.opener) {
        window.opener.postMessage("authorizing:github", "*");
        window.opener.postMessage(
          'authorization:github:success:${successData}',
          "${allowedOrigin === "*" ? "*" : allowedOrigin}"
        );
      }
    })();
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const errorData = JSON.stringify({ error: payload });
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Authorization Failed — Decap CMS</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #FBF5EA; color: #241B14;">
  <div style="text-align: center; max-width: 480px; padding: 2rem; background: #FFFDF8; border-radius: 12px; border: 1px solid #E2D2B3; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <h2 style="color: #A93A2B; margin-top: 0;">Access Denied</h2>
    <p style="color: #5E4E3F; line-height: 1.6;">${payload}</p>
    <p style="font-size: 0.875rem; color: #8C7B6B;">Only authorized repository collaborators may publish content changes.</p>
  </div>
  <script>
    if (window.opener) {
      window.opener.postMessage(
        'authorization:github:error:${errorData}',
        "${allowedOrigin === "*" ? "*" : allowedOrigin}"
      );
    }
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 403,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
