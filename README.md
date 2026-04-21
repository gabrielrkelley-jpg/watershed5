# Watershed — Clinician-Designed Wellness Support

A clinician-designed AI wellness companion built on the NASW Code of Ethics, unconditional positive regard, and the principle of the client as expert.

---

## Deploy to Vercel

### Step 1 — GitHub
1. Go to github.com and create a free account
2. Create a new repository called `watershed`
3. Upload all the files from this folder (drag and drop)

### Step 2 — Vercel
1. Go to vercel.com and sign up with your GitHub account
2. Click **Add New Project** → select your `watershed` repository
3. Leave build settings as default
4. **Before clicking Deploy** — click **Environment Variables** and add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key (from console.anthropic.com)
5. Click **Deploy**

That's it. You'll get a live URL in about 60 seconds.

### Getting your Anthropic API key
1. Go to console.anthropic.com
2. Sign in or create an account
3. Click **API Keys** in the left sidebar
4. Click **Create Key** — copy it immediately, it won't show again
5. Paste it into the Vercel environment variable field

---

## Project structure

```
watershed/
├── api/
│   └── chat.js          ← server-side proxy (keeps API key secure)
├── src/
│   ├── App.jsx          ← main application
│   └── main.jsx         ← React entry point
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## About

Watershed is a wellness support and psychoeducation tool. It is not a licensed clinical service. All clinical orientation, language standards, ethical frameworks, and knowledge bases are designed and maintained by licensed mental health clinicians. Watershed adheres to the NASW Code of Ethics and is grounded in unconditional positive regard and the principle of the client as expert.

Patent pending. Gabriel Ryan Kelley, sole inventor.
