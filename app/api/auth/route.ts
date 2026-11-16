import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "Missing GITHUB_CLIENT_ID environment variable. Please configure GitHub OAuth credentials in .env.local or production environment.",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state") || Math.random().toString(36).substring(2, 15);
  const scope = "repo,user";

  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
    clientId
  )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;

  return NextResponse.redirect(redirectUrl);
}
