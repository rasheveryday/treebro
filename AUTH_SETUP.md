# Treebro Authentication Setup Guide

This document provides complete instructions for setting up Google OAuth authentication with NextAuth.js, both locally and on Vercel.

## Overview

Treebro uses **NextAuth.js** with **Google OAuth 2.0** for user authentication. The implementation includes:
- Secure JWT-based sessions
- Protected `/session` route (requires authentication)
- User profile display with logout
- Sleek login modal UI

---

## Part 1: Local Development Setup

### 1.1 Install Dependencies

NextAuth.js is already installed. Verify in `package.json`:

```bash
npm list next-auth
```

### 1.2 Get Google OAuth Credentials

You need to create a Google OAuth 2.0 application:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **Google+ API**:
   - Click "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Click "Credentials" in the left sidebar
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for local development)
     - `https://your-vercel-domain.vercel.app/api/auth/callback/google` (for production)
   - Copy the **Client ID** and **Client Secret**

### 1.3 Generate NEXTAUTH_SECRET

Generate a secure random secret:

```bash
openssl rand -base64 32
```

Copy the output (you'll use this in the next step).

### 1.4 Create Local Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your values:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_generated_secret_from_step_13
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Provider
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 1.5 Test Locally

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000`:
- Click "Sign In" button in the header
- Try signing in with your Google account
- You should see your profile picture and name in the header
- Click "Start Gauntlet" — it should let you proceed to `/session`
- Visit `/session` directly without signing in — you should be redirected to home with a login modal

---

## Part 2: Vercel Production Deployment

### 2.1 Push Code to Git

Make sure all authentication code is committed:

```bash
git add .
git commit -m "feat: add NextAuth.js Google OAuth authentication"
git push
```

### 2.2 Deploy to Vercel

Two options:

**Option A: Via Vercel Dashboard**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your Git repository
4. Click "Deploy"
5. **Vercel will automatically detect Next.js** — no build configuration needed

**Option B: Via Vercel CLI**
```bash
npm install -g vercel
vercel
```

### 2.3 Set Environment Variables in Vercel

After deploying, set the environment variables:

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Settings" → "Environment Variables"
3. Add each of these variables:

| Variable | Value | Source |
|----------|-------|--------|
| `NEXTAUTH_SECRET` | Your generated secret from Part 1, Step 3 | Run `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-vercel-domain.vercel.app` | Your actual Vercel domain (e.g., `https://treebro-1a2b3c.vercel.app`) |
| `GOOGLE_CLIENT_ID` | Your Google Client ID | From [Google Cloud Console](https://console.cloud.google.com/) |
| `GOOGLE_CLIENT_SECRET` | Your Google Client Secret | From [Google Cloud Console](https://console.cloud.google.com/) |

**Important**: Set these variables to be available in **Production**, **Preview**, and **Development** environments.

### 2.4 Update Google OAuth Redirect URIs

Go back to [Google Cloud Console](https://console.cloud.google.com/) and add your Vercel domain as an authorized redirect URI:

1. APIs & Services → Credentials
2. Click your OAuth 2.0 application
3. Add a new authorized redirect URI: `https://your-vercel-domain.vercel.app/api/auth/callback/google`
4. Click "Save"

### 2.5 Redeploy

Vercel will automatically redeploy once you've set the environment variables. If not, manually redeploy:

1. Go to your Vercel project
2. Click "Deployments" → latest deployment
3. Click the three dots → "Redeploy"

---

## Part 3: Complete Environment Variables Reference

### For Local Development (`.env.local`)

```env
# NextAuth.js Configuration
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### For Vercel (Dashboard Settings → Environment Variables)

```
NEXTAUTH_SECRET = your_generated_secret_here
NEXTAUTH_URL = https://your-vercel-domain.vercel.app
GOOGLE_CLIENT_ID = your_google_client_id_here
GOOGLE_CLIENT_SECRET = your_google_client_secret_here
```

---

## Part 4: File Structure

Here's what was added to implement authentication:

```
treebro/
├── lib/
│   └── auth.ts                          # NextAuth.js configuration
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth.js API route
│   ├── layout.tsx                       # Added Providers wrapper
│   └── page.tsx                         # Added AuthButton & LoginModal
├── components/
│   ├── auth-button.tsx                  # User profile + logout dropdown
│   ├── login-modal.tsx                  # Sleek login modal
│   ├── providers.tsx                    # SessionProvider wrapper
│   └── search-params-wrapper.tsx        # Search params helper
├── middleware.ts                         # Route protection for /session
├── .env.local.example                   # Environment template
└── AUTH_SETUP.md                        # This file
```

---

## Part 5: Troubleshooting

### Issue: "Invalid `client_id` supplied" when signing in

**Solution**: Your `GOOGLE_CLIENT_ID` is incorrect or not set. Double-check in [Google Cloud Console](https://console.cloud.google.com/).

### Issue: "The redirect_uri does not match" error

**Solution**: The callback URL doesn't match Google's authorized URIs. Make sure you've added both:
- `http://localhost:3000/api/auth/callback/google` (local)
- `https://your-vercel-domain.vercel.app/api/auth/callback/google` (production)

### Issue: Session not persisting after sign in

**Solution**: Make sure `NEXTAUTH_SECRET` is set correctly and is the same in local and Vercel environments.

### Issue: `/session` route not protected

**Solution**: Middleware might not be running. Check:
1. `middleware.ts` exists in project root
2. NextAuth is installed: `npm list next-auth`
3. Rebuild: `npm run build`

### Issue: User profile picture not showing

**Solution**: This is expected if your Google account doesn't have a profile picture set. The fallback shows your name initials.

---

## Part 6: Testing Checklist

- [ ] Sign in with Google on localhost
- [ ] Profile picture and name appear in header
- [ ] Can click "Start Gauntlet" to access `/session`
- [ ] Clicking "Sign Out" logs you out
- [ ] Visiting `/session` directly without signing in redirects to home with login modal
- [ ] Same flow works on Vercel after deployment
- [ ] No "redirect_uri does not match" errors
- [ ] No "Invalid client_id" errors

---

## Part 7: Security Notes

1. **Never commit `.env.local`** — it's in `.gitignore`
2. **NEXTAUTH_SECRET must be random and unique** — use `openssl rand -base64 32`
3. **Google Client Secret should never be in version control** — only set it in Vercel
4. **Session tokens are JWT-based and signed** — cannot be forged
5. **HTTPS required for production** — Google OAuth won't work over HTTP except localhost

---

## Next Steps

Once authentication is live:
1. Store user preferences (session history, bookmarks) in a database
2. Add user email verification (optional)
3. Implement subscription tiers or session limits
4. Track user progress and analytics

---

**Created**: 2026-06-10
**Framework**: Next.js 14 + NextAuth.js 5
**Database**: None (JWT sessions only)
