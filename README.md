# 🔥 HotDeals — Amazon Deals Site

A fast, beautiful Amazon deals site built with Next.js + Supabase.
Add new deals from the Supabase dashboard — no coding needed after setup!

---

## 📁 File Structure

```
deals-site/
├── pages/
│   ├── _app.js          ← App wrapper (don't touch)
│   ├── _document.js     ← HTML structure (don't touch)
│   └── index.js         ← Your homepage
├── components/
│   ├── DealCard.js      ← Each deal card UI
│   └── SkeletonCard.js  ← Loading animation
├── lib/
│   └── supabase.js      ← Database connection
├── styles/
│   └── globals.css      ← All styling
├── supabase-setup.sql   ← Run this in Supabase once
├── .env.example         ← Copy to .env.local with your keys
├── next.config.js       ← Next.js settings
└── package.json         ← Dependencies
```

---

## 🚀 Setup Guide (Step by Step)

### STEP 1 — Create a Supabase account and database

1. Go to **https://supabase.com** → Sign Up (free)
2. Click **"New Project"**
3. Name it `deals-site`, pick a region close to you, set a password
4. Wait ~2 minutes for it to initialize
5. Go to **SQL Editor** (left sidebar) → **New Query**
6. Paste the entire contents of `supabase-setup.sql` into the editor
7. Click **Run** — this creates your deals table with sample data

### STEP 2 — Get your Supabase API keys

1. In your Supabase project, go to **Settings** (gear icon, left sidebar)
2. Click **API**
3. Copy two values:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon / public** key (long string starting with `eyJ...`)

### STEP 3 — Set up the project on your computer

You need Node.js installed. Download it free at **https://nodejs.org** (click "LTS")

Then open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
# Go into the project folder
cd deals-site

# Copy the environment file
cp .env.example .env.local

# Open .env.local in any text editor and paste your Supabase keys:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Install dependencies
npm install

# Start the site locally
npm run dev
```

4. Open your browser → go to **http://localhost:3000**
5. You should see your deals site with the sample deals! 🎉

### STEP 4 — Put your site online (Deploy to Vercel)

1. Go to **https://github.com** → Create a free account
2. Create a new repository called `deals-site`
3. Upload all your project files to it
4. Go to **https://vercel.com** → Sign up with GitHub
5. Click **"Add New Project"** → Import your `deals-site` repo
6. Before clicking Deploy, click **"Environment Variables"** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
7. Click **Deploy** — your site is live in ~2 minutes!
8. Vercel gives you a free URL like `deals-site-abc.vercel.app`

### STEP 5 — Connect a custom domain (optional)

1. Buy a domain at **https://namecheap.com** (e.g., `mydeals.com` — ~$10/year)
2. In Vercel → your project → **Settings** → **Domains**
3. Add your domain and follow the DNS instructions
4. Done — your site works at your custom domain!

---

## 📝 Daily Workflow — Adding New Deals

This takes about 30 seconds per deal:

1. Go to **https://supabase.com** → your project → **Table Editor** → `deals`
2. Click **"Insert Row"** button
3. Fill in the fields:

| Field | What to put | Example |
|-------|-------------|---------|
| `title` | Product name from Amazon | "Anker USB-C Charger 65W" |
| `image_url` | Amazon image URL (right-click → Copy image address) | `https://m.media-amazon.com/...` |
| `original_price` | Original price (crossed out on Amazon) | `35.99` |
| `sale_price` | Current sale price | `14.99` |
| `discount_percent` | % off (optional — auto-calculated if blank) | `58` |
| `coupon_code` | Promo code if any (leave blank if none) | `SAVE20` |
| `affiliate_link` | Your Amazon affiliate link | `https://amzn.to/...` |
| `deal_date` | Today's date | `2024-06-19` |
| `active` | `true` to show, `false` to hide | `true` |

4. Click **Save** — the deal appears on your site **instantly**!

### Hiding expired deals
Just go to the deal row in Supabase → set `active` to `false` → Save.
The deal disappears from your site immediately.

---

## ✏️ Customization

### Change the site name
Open `pages/index.js` and edit line 8:
```js
const SITE_NAME = "Today's Best Deals";  // ← Change this
```

### Change the logo emoji and text
In `pages/index.js`, find the header section and edit:
```html
<div className="logo-icon">🔥</div>
<span className="logo-text">Hot<span>Deals</span></span>
```

### Change the accent color (orange)
Open `styles/globals.css` and change line 8:
```css
--accent: #ff6b00;  /* ← Change to any color, e.g. #e53e3e for red */
```

---

## 💰 Costs

| Service | Cost |
|---------|------|
| Supabase | Free (up to 500MB, 50,000 rows) |
| Vercel hosting | Free (up to 100GB bandwidth/month) |
| Domain name | ~$10/year |
| **Total** | **~$10/year** |

---

## 🆘 Common Issues

**Site shows blank / no deals**
→ Check your `.env.local` file has the correct Supabase URL and key
→ Make sure you ran the SQL setup script in Supabase

**Images not loading**
→ Make sure the image URL is a direct link to the image (ends in .jpg, .png, etc.)
→ Amazon image URLs from `m.media-amazon.com` work best

**Deal not showing after adding in Supabase**
→ Check the `active` column is set to `true`
→ Hard refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)

---

Made with ❤️ using Next.js, Supabase, and Vercel.
