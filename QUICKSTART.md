# Authentication Setup - Quick Start (5 minutes)

## 1. Get Google OAuth Credentials (3 min)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Search for "Google+ API" → Enable it
4. Click "Credentials" → "Create Credentials" → "OAuth client ID"
5. Select "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-vercel-domain.vercel.app/api/auth/callback/google` (later)
7. Copy **Client ID** and **Client Secret**

## 2. Set Up Local Environment (1 min)

```bash
# Copy the template
cp .env.local.example .env.local

# Generate a secret
openssl rand -base64 32
```

Edit `.env.local`:
```env
NEXTAUTH_SECRET=<paste_generated_secret>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<paste_from_google>
GOOGLE_CLIENT_SECRET=<paste_from_google>
```

## 3. Test Locally (1 min)

```bash
npm run dev
```

Visit `http://localhost:3000`:
- Click "Sign In" → should show Google login button
- Sign in with your Google account
- See your profile picture in the header
- Click "Start Gauntlet" → should let you access the session

## 4. Deploy to Vercel (later)

1. Push code to Git
2. Vercel auto-deploys
3. In Vercel Dashboard → Settings → Environment Variables, add:
   - `NEXTAUTH_SECRET` (same value)
   - `NEXTAUTH_URL` = `https://your-vercel-domain.vercel.app`
   - `GOOGLE_CLIENT_ID` (same value)
   - `GOOGLE_CLIENT_SECRET` (same value)
4. Update Google's authorized redirect URI with your Vercel domain
5. Vercel auto-redeploys → Done!

---

## Exact Environment Variables for Vercel

| Name | Value |
|------|-------|
| `NEXTAUTH_SECRET` | Your generated secret from `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your Vercel domain (e.g., `https://treebro-abc123.vercel.app`) |
| `GOOGLE_CLIENT_ID` | From [Google Cloud Console](https://console.cloud.google.com/) |
| `GOOGLE_CLIENT_SECRET` | From [Google Cloud Console](https://console.cloud.google.com/) |

---

See `AUTH_SETUP.md` for full documentation.
