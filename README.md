# Web3Bridge — web3bridgeafrica.com

Africa's blockchain developer school. Built with Next.js 14, TypeScript, and Tailwind CSS.

---

## Quick start

```bash
npm install
cp .env.local .env.local  # fill in your actual values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment variables

Create `.env.local` with:

```env
# Crisp live chat
NEXT_PUBLIC_CRISP_WEBSITE_ID=your-crisp-website-id

# Site URL
NEXT_PUBLIC_SITE_URL=https://web3bridgeafrica.com

# Supabase (when ready)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend email (when ready)
RESEND_API_KEY=your-resend-api-key

# Paystack (when ready)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your-paystack-public-key
PAYSTACK_SECRET_KEY=your-paystack-secret-key
```

---

## Project structure

```
src/
├── app/                    # All pages (Next.js App Router)
│   ├── page.tsx            # Homepage
│   ├── programs/           # Programmes listing + detail pages
│   ├── blog/               # Blog (pulls from Medium RSS)
│   ├── about/              # About page
│   ├── conference/         # Web3 Lagos Conference 5.0
│   ├── eth-hub/            # Ethereum Community Hub
│   ├── alumni/             # Alumni page
│   ├── dapps/              # DApps directory
│   ├── partners/           # Partners page
│   ├── contact/            # Contact form
│   ├── apply/              # Application form
│   ├── login/              # Student login
│   ├── dashboard/          # Student dashboard (protected)
│   ├── reset-password/     # Password reset
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── api/apply/          # Application submission API route
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation with Programs dropdown
│   │   └── Footer.tsx      # Footer with resourceful links
│   ├── sections/
│   │   ├── Hero.tsx        # Homepage hero (photo mosaic)
│   │   └── HomeSections.tsx # All other homepage sections
│   └── CrispChat.tsx       # Crisp live chat
├── lib/
│   ├── programmes.ts       # All programme data and curriculum
│   └── utils.ts            # Utilities, constants, logo data
└── types/
    └── index.ts            # TypeScript types
```

---

## Development checklist — what still needs to be done

### Integrations to wire in

- [ ] **Crisp** — Add your Website ID to `.env.local`. Done.
- [ ] **Auth** — Install and configure NextAuth.js or Clerk. Protect `/dashboard` route.
- [ ] **Supabase** — Create `applications` table. Connect `/api/apply` route to store submissions.
- [ ] **Resend** — Wire confirmation emails in `/api/apply` route.
- [ ] **Paystack** — Add payment step to `/apply` flow after form submission.
- [ ] **Stripe** — Add USD payment option alongside Paystack.
- [ ] **Analytics** — Install Posthog or Google Analytics 4.

### Photos to replace

All photo placeholders in the UI are clearly labelled. Replace with real cohort/conference photos:
- Hero mosaic: 9 cells (cohort sessions, graduates, conference moments)
- About strip: 1 wide classroom/coding session shot
- Programme thumbnails: 1 per track/sprint (10 total)
- Conference section: 1 keynote/crowd shot
- Community grid: 6 community/event photos

See the design PDF (web3bridge_homepage_design_concepts_v6.pdf) for the full photo brief.

### Logo to add
Replace the `[B]` text mark with the actual Web3Bridge SVG logo once available.

### Content to fill in
- Conference speakers (conference/page.tsx)
- DApps directory entries (dapps/page.tsx)
- Blog will auto-populate from Medium RSS once the feed URL is correct

---

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel --prod
```

Point `web3bridgeafrica.com` DNS to Vercel. SSL is automatic.

---

## Brand

- **Primary red:** `#E63946`
- **Background:** `#0a0a0a`
- **Font:** Geist Sans (Next.js default)
- **Design reference:** See `web3bridge_homepage_design_concepts_v6.pdf`

---

## Photo upload system — Supabase Storage setup

The admin photo upload system stores images in Supabase Storage. Set it up in 5 minutes:

### 1. Create a Supabase project
Go to https://supabase.com and create a free project.

### 2. Create storage buckets
In your Supabase dashboard → Storage → Create bucket. Create these 5 buckets, all set to **Public**:

| Bucket name | Purpose |
|---|---|
| `community-photos` | Community grid (6 photos) |
| `hero-photos` | Homepage hero mosaic (9 photos) |
| `about-photo` | About section strip (1 photo) |
| `programme-photos` | Programme card thumbnails (1 per programme) |
| `media-library` | General media store |

### 3. Set bucket policies (make files publicly readable)
For each bucket, go to Policies → New policy → "Give users access to own folder" — or just run this SQL in the Supabase SQL editor:

```sql
-- Run for each bucket name
CREATE POLICY "Public read" ON storage.objects FOR SELECT USING (bucket_id = 'community-photos');
CREATE POLICY "Auth upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'community-photos');
CREATE POLICY "Auth delete" ON storage.objects FOR DELETE USING (bucket_id = 'community-photos');
-- Repeat for: hero-photos, about-photo, programme-photos, media-library
```

### 4. Add env vars
Copy your Supabase project URL and anon key from Settings → API into `.env.local`.

### 5. Set your admin password
Set `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local` to whatever password you want for the admin panel.

### Accessing the admin panel
Go to `/admin` on your site. Enter the password. You'll see:
- `/admin/media` — general media library (upload, browse, copy URLs)
- `/admin/hero-photos` — homepage hero mosaic (9 slots with layout diagram)
- `/admin/about-photo` — about section photo (1 slot)
- `/admin/community-photos` — community grid (6 slots with labels)
- `/admin/programme-photos` — one thumbnail per track/sprint (10 total)

Drag and drop photos into any section. They go live instantly — no redeploy needed.

---

## Deploying to Netlify

The repo includes `netlify.toml` — Netlify auto-detects Next.js and handles everything.

### Option A — Git-based deploy (recommended)
1. Push this codebase to a GitHub repo
2. Go to https://app.netlify.com → "Add new site" → "Import an existing project"
3. Pick the repo. Build settings are auto-detected from netlify.toml
4. Before deploying, add your environment variables under **Site settings → Environment variables**:
   - `NEXT_PUBLIC_CRISP_WEBSITE_ID`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - `RESEND_API_KEY` (when ready)
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` / `PAYSTACK_SECRET_KEY` (when ready)
5. Deploy. Every push to main auto-deploys; PRs get preview URLs.

### Option B — CLI deploy (no Git needed)
```bash
npm install -g netlify-cli
netlify login
netlify init        # creates the site
netlify env:set NEXT_PUBLIC_ADMIN_PASSWORD your-password   # repeat for each var
netlify deploy --build --prod
```

### Custom domain
Site settings → Domain management → Add custom domain → web3bridgeafrica.com
Point your DNS (A record to Netlify's load balancer, or use Netlify DNS). SSL is automatic.

### Notes
- The `/api/apply` route and `/admin/*` pages run as Netlify Functions automatically
- Preview the site locally first: `npm run dev` → http://localhost:3000
