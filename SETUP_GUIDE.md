# 💌 Five Letters For You — Complete Beginner's Setup Guide

Welcome. This guide will walk you through everything step by step. You don't need to know how to code. You just need to follow these instructions carefully, and at the end you'll have a beautiful website with a link you can send her.

---

## 📋 Quick Overview

Here's what you're going to do:
1. Put the code on GitHub (free code storage website)
2. Edit your letters and settings in one simple file
3. Deploy the website on Vercel (free hosting)
4. Send her the link

Total time: about 20–40 minutes.

---

## STEP 1 — Create a GitHub Account (if you don't have one)

1. Go to **https://github.com**
2. Click **Sign up**
3. Follow the steps to create a free account
4. Verify your email

---

## STEP 2 — Upload the Code to GitHub

### Option A — Using GitHub's website (easiest, no downloads)

1. Go to **https://github.com/new** to create a new repository
2. Repository name: `five-letters-for-you` (or anything you want)
3. Set it to **Private** (important — you don't want this public!)
4. Click **Create repository**

5. You'll see a page with setup instructions. Look for the option that says **"uploading an existing file"** and click it.

6. **Upload all the files from this project** by dragging and dropping the entire folder.
   - Upload everything including all subfolders

> **Tip:** If GitHub's drag-and-drop doesn't handle folders well, use Option B below.

### Option B — Using StackBlitz (even easier, fully browser-based)

StackBlitz lets you edit and deploy code entirely in your browser — no uploads needed.

1. Go to **https://stackblitz.com**
2. Click **Start a new project**
3. Choose **Next.js**
4. Once the project opens, you'll see a file panel on the left
5. Delete all the existing files
6. Create each file from this project by clicking the **+** button and pasting the code

> The files you need to create are listed in the **File Structure** section below.

### Option C — Using GitHub Codespaces (most powerful, still browser-based)

1. After creating your GitHub repo (Step 2, Option A)
2. Click the green **Code** button
3. Click **Codespaces** tab
4. Click **Create codespace on main**
5. A full code editor opens in your browser
6. You can now edit files directly here

---

## STEP 3 — Edit Your Letters (The Important Part)

**The only file you need to edit is:**

```
src/lib/content.ts
```

Open this file. Everything is clearly labeled. Here's what to change:

### 🔐 Change the password

Find this line:
```typescript
export const SITE_PASSWORD = "openme";
```
Change `"openme"` to whatever you want her password to be. Keep it simple and memorable.

**Tell her the password separately** — send it in a text message, leave it in a note, etc.

### 💑 Change her name

Find this line:
```typescript
export const HER_NAME = "My Love";
```
Change `"My Love"` to her actual name or nickname.

### 📅 Set the start date

Find this line:
```typescript
export const WEEK_ONE_START_DATE = "2025-07-01";
```
Change this to the date you want Week 1 to unlock. Use the format `YYYY-MM-DD`.

- Week 1 unlocks on this date
- Week 2 unlocks 7 days later
- Week 3 unlocks 14 days later
- And so on...

### ✏️ Write your letters

Find the `LETTERS` array. For each of the 5 letters, replace the `body` text with your real letter. The body uses backtick quotes (```) and supports paragraph breaks using blank lines.

Example:
```typescript
body: `This is my first paragraph.

This is my second paragraph.

This is my third paragraph.`,
```

The `title` and `previewText` fields are also editable — the title shows on the card, and the preview is a short teaser.

### 🖼️ Add your photos

To add real photos to the Museum of Us:

1. Go to **https://imgbb.com** (free, no account needed for basic use)
2. Click **Start Uploading**
3. Select a photo from your phone or computer
4. After it uploads, click **Copy BBCode** then look for the **Direct link** — it looks like `https://i.ibb.co/...`
5. Copy that URL
6. In `content.ts`, find the `MUSEUM_ITEMS` array and replace the `imageUrl` values with your real photo URLs

For each photo item, you can also update:
- `title`: The name of the memory
- `date`: When it happened
- `location`: Where it was
- `caption`: A short romantic note about the photo
- `category`: One of these four: `"Favorite Moments"`, `"Places We've Been"`, `"Little Things I Love"`, `"Us Being Us"`

You can add more photos by copying one of the existing items and giving it a new `id` number.

---

## STEP 4 — Preview the Website

### If using StackBlitz:
The preview shows automatically in the right panel. It updates as you save changes.

### If using GitHub Codespaces:
In the terminal at the bottom, type:
```bash
npm install
npm run dev
```
Then click the preview link that appears.

### If using your own computer (if you choose to download VS Code later):
```bash
npm install
npm run dev
```
Then open `http://localhost:3000` in your browser.

---

## STEP 5 — Deploy on Vercel (Get Your Shareable Link)

Vercel is a free hosting service. Here's how to deploy:

1. Go to **https://vercel.com**
2. Click **Sign Up** and choose **Continue with GitHub**
3. Allow Vercel to access your GitHub account
4. Click **Add New Project**
5. Find your repository (`five-letters-for-you`) and click **Import**
6. Leave all settings as they are (Vercel detects Next.js automatically)
7. Click **Deploy**
8. Wait about 2 minutes while it builds
9. You'll see a confetti animation and a link like: `https://five-letters-for-you.vercel.app`

**That's your link.** That's what you send her. 🎉

---

## STEP 6 — Making Changes After Deployment

If you want to update anything (fix a typo in a letter, change a date, add a photo):

1. Edit the file in GitHub or Codespaces
2. Save/commit your changes
3. Vercel automatically detects the change and re-deploys in about 1 minute
4. The site updates automatically — no action needed from you

---

## 📁 File Structure

Here's every file and what it does:

```
five-letters-for-you/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx       → Page wrapper, fonts, metadata (title of browser tab)
│   │   ├── page.tsx         → Main page logic (password gate + site layout)
│   │   └── globals.css      → All the beautiful styling
│   │
│   ├── components/
│   │   ├── PasswordGate.tsx       → The password screen
│   │   ├── Navbar.tsx             → Top navigation bar
│   │   ├── HeroSection.tsx        → Beautiful intro section
│   │   ├── LettersSection.tsx     → All 5 letter cards + countdown
│   │   ├── LetterCard.tsx         → Individual letter card (locked/unlocked)
│   │   ├── LetterReader.tsx       → Full letter reading experience
│   │   ├── CountdownToNextLetter.tsx → Live countdown timer
│   │   ├── MuseumGallery.tsx      → Photo gallery + lightbox
│   │   └── Footer.tsx             → Footer with hidden easter egg
│   │
│   └── lib/
│       ├── content.ts    ⭐ EDIT THIS FILE — all your letters, photos, and settings
│       └── utils.ts           → Date calculations (don't need to touch this)
│
├── package.json           → Project dependencies
├── next.config.js         → Next.js settings (allows external images)
├── tailwind.config.js     → Design system colors and fonts
├── tsconfig.json          → TypeScript config
└── .gitignore             → Files to ignore in git
```

---

## 🔒 Privacy Notes

- The website is **not indexed by search engines** by default
- The password protects it from casual visitors
- Hosting it privately on Vercel means only people with the link can find it
- For extra privacy, consider setting your GitHub repo to **Private**

---

## 🐛 Common Issues

**"The page is blank"**
- Make sure you've installed dependencies: `npm install`
- Make sure the dev server is running: `npm run dev`

**"Images aren't showing"**
- Make sure you're using a direct image URL (ends in .jpg, .png, .webp)
- imgbb.com and postimages.org work best
- Avoid Google Photos or iCloud links (they don't work as direct image URLs)

**"Letters aren't unlocking at the right time"**
- Double-check the date format in `WEEK_ONE_START_DATE` — it must be `"YYYY-MM-DD"`
- Remember the site uses your computer's current date/time

**"Vercel says build failed"**
- This is usually a typo in `content.ts`
- Check that all your letter body text ends with a backtick: `` ` ``
- Check that all commas between letters are present

---

## 📬 Sending It To Her

Once deployed, you'll have a Vercel URL. Send it to her like this:

---

*I made something for you. Open this: [your-url-here]*

*The password is: [your-password]*

*Come back every week.*

---

Or wrap it up however feels right for you two. The website will do the rest.

---

## 💛 You've Got This

This is a beautiful thing you're making. Don't let the technical steps intimidate you — every part of this is designed to be as simple as possible. Take it one step at a time.

If something breaks or you get stuck, you can come back to Claude and ask for help. Just say "I'm building the love letter website and I'm stuck on [the thing]."

Good luck. She's going to love it.
