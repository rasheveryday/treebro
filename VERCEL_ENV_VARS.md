# Vercel Environment Variables Checklist

## Quick Reference: Add These to Vercel Dashboard

Go to your Vercel project → **Settings** → **Environment Variables** and add:

| Variable Name | Value | Example |
|---|---|---|
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` | `ABCDEfg1234+/XYZ...=` |
| `NEXTAUTH_URL` | Your Vercel domain | `https://treebro-abc123.vercel.app` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console | `123456789-abcdefg.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console | `GOCSPX-1a2b3c4d5e6f7g8h` |

## Step-by-Step

### 1. Generate NEXTAUTH_SECRET (run locally)
```bash
openssl rand -base64 32
```
Copy the output.

### 2. Find Your Vercel Domain
After deploying to Vercel, your domain will be something like:
- `https://treebro-abc123.vercel.app`
- Check Vercel Dashboard → Deployments → Production

### 3. Get Google Credentials
Visit [Google Cloud Console](https://console.cloud.google.com/):
1. APIs & Services → Credentials
2. Find your OAuth 2.0 application
3. Copy **Client ID** and **Client Secret**

### 4. Add to Vercel
In Vercel Dashboard → Settings → Environment Variables:
- Paste all four variables above
- Make sure each is set for **Production**, **Preview**, and **Development**

### 5. Update Google's Authorized URIs
Back in Google Cloud Console:
1. OAuth 2.0 Client ID settings
2. Add authorized redirect URI: `https://your-vercel-domain.vercel.app/api/auth/callback/google`
3. Click Save

### 6. Redeploy
Vercel will auto-redeploy. If not:
- Vercel Dashboard → Deployments → Click latest → Redeploy

## ✅ Test It

1. Visit your Vercel domain
2. Click "Sign In"
3. Sign in with Google
4. See your profile picture in the header
5. Click "Start Gauntlet" → should redirect to `/session`

Done! 🎉
