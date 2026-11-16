# Maadhav Sewa Sansthan — Website Content Management Guide

Welcome to the content administration guide for **Maadhav Sewa Sansthan**. This website uses **Decap CMS**, a Git-based content management tool. 

Every change you publish is saved directly into the website's GitHub repository. There is no external database, which keeps the website safe, permanent, and fast.

---

## 1. How to Log In

1. Open your web browser and go to:
   ```
   https://<your-website-domain>/admin
   ```
2. You will see the login screen with a **"Login with GitHub"** button.
3. Click **"Login with GitHub"**.
   > *[Screenshot Placeholder: Decap CMS Login screen with GitHub button]*
4. A popup window will appear asking you to authorize access to your GitHub account.
   - Enter your GitHub username and password if prompted.
   - Click **Authorize**.
5. Once authorized, the popup will close automatically, and you will be taken to the Content Dashboard.
   > **Note:** Only team members who have been invited and granted access to the repository on GitHub can log in and publish updates.

---

## 2. Navigating the Content Collections

On the left side of the dashboard, you will find our content collections:

- **Events & Programmes**: Manage upcoming drives, health camps, volunteer initiatives, and concluded events.
- **Activities & Stories**: Share on-ground news, field stories, and detailed photos of initiatives.
- **Gallery Archive**: Add photos and videos of our grassroots work across Raebareli.
- **Founder Profile**: Edit the founder's biography, role, quotes, and profile photo.
- **Focus Areas**: Manage the core focus categories displayed across the website.
- **Site Settings & Details**: Update official contact numbers, office address, donation guidance, and impact figures.

---

## 3. How to Add a New Event or Activity

1. Click on **Events & Programmes** (or **Activities & Stories**) from the left menu.
2. Click the green **"New Event"** (or **"New Activity"**) button at the top right.
   > *[Screenshot Placeholder: 'New Event' button in Decap CMS dashboard]*
3. Fill in the details:
   - **Identifier (ID):** A unique, lowercase label without spaces (e.g., `free-eye-camp-oct-2026`).
   - **Title:** Enter the event name in both English and Hindi.
   - **Date:** Select the scheduled date using the calendar picker (`YYYY-MM-DD`).
   - **Status:** Choose `upcoming` for future programs or `past` for concluded initiatives. (The website also automatically checks the date to mark past events!).
   - **Category:** Choose the appropriate sector (Health, Education, Livelihood, Environment, Social Welfare).
   - **Location:** Enter the village, block, or district location (e.g., *Raebareli District, Uttar Pradesh*).
   - **Description:** Provide a summary of the initiative. You can use standard formatting like bold or bullet points.

---

## 4. Filling English & Hindi Translations Together

Our website offers a bilingual experience with an instant English / Hindi toggle. To make editing easy, both languages are placed directly in the same editing form:

1. Look for fields with **English** and **Hindi** sections.
2. In the English section, type your English copy.
3. In the Hindi section, type your Hindi translation.
   > **Important Reminder:** Every Hindi field includes a notice: *"Please review Hindi before publishing"*. Please double-check spelling and phrasing in Devanagari script before saving.
   > *[Screenshot Placeholder: Bilingual form view showing English and Hindi fields side-by-side]*

---

## 5. How to Upload Photos & Media

You can upload new photos directly from your computer or phone:

1. Find the **Cover Image** or **Photos** field in the form.
2. Click **"Choose an image"** or **"Upload"**.
   > *[Screenshot Placeholder: Media Library dialog with 'Upload' button]*
3. The Media Library will open. You can:
   - Select an existing photo from the library, or
   - Click **"Upload"** to choose a new photo file from your computer (`.jpg`, `.png`, or `.webp`).
4. Once uploaded, click on the photo and choose **"Insert"**.

---

## 6. How to Save and Publish

1. Once you have completed all required fields, click the **"Publish"** button at the top right of the screen.
2. Click **"Publish now"** in the dropdown to confirm.
   > *[Screenshot Placeholder: Top bar showing 'Publish' and status indicators]*
3. **What happens next?**
   - Decap CMS creates a new update (commit) in our GitHub repository.
   - Vercel detects this update and automatically builds the new version of the website.
   - **Please wait 1 to 2 minutes** for the deployment to finish. After 1–2 minutes, refresh the live website to see your new changes!

---

## 7. Managing Impact Figures & Verification

In **Site Settings & Details**:
- Each impact metric has a **"Verified"** switch.
- When **Verified** is turned **OFF (false)**, the public website displays the figure with our standard compliance note: *"Figures to be confirmed by the organisation alongside statutory filings"*.
- When **Verified** is turned **ON (true)**, the official verified number will be prominently displayed to visitors.

---

## 8. Need Help or Technical Support?

If you encounter an error or cannot log in:
- Ensure your GitHub account has collaborator permissions on the repository.
- Make sure all required fields marked with an asterisk are filled.
- Contact the website technical coordinator for assistance.
