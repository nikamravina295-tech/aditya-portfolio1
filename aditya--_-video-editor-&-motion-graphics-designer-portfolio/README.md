# Aditya Shinde — Portfolio Website

A cinematic, highly interactive portfolio website for Aditya Shinde, Video Editor & Motion Graphics Designer. Built with React, TypeScript, Vite, Motion, and Tailwind CSS.

---

## 🚀 Deployment to Vercel via GitHub

### Step 1: Export or Push Code to GitHub

**Option A: Export directly from AI Studio**
1. Click on the **Settings / Menu** icon in the top right of AI Studio.
2. Select **Export to GitHub** (or **Download ZIP** and upload it to a new GitHub repository).

**Option B: Push using Git CLI**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and log in or create a free account.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository (`YOUR_REPO_NAME`).
4. Vercel will automatically detect the **Vite** framework:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```
