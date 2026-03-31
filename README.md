# Monthly Stays Comparison Page

A single-page HTML tool for researching, comparing, and voting on monthly rental listings across multiple platforms. Built for couples or individuals exploring a new city with a 1-month trial stay.

**Live example:** [santa-monica-stays.vercel.app](https://santa-monica-stays.vercel.app/)

---

## How It Works

The page collects listings from Airbnb, VRBO, Furnished Finder, and other platforms into one votable interface. Each listing gets Approve / Maybe / Deny buttons. Clicking **Submit Selections** persists votes directly into the HTML via a Vercel serverless function that commits to GitHub — so the page always reflects the latest decisions on reload.

---

## Step 1: Define Your Search Criteria

Before sourcing listings, nail down your parameters. These become the **goal tags** at the top of the page and drive every search filter.

You'll need:

- **City and neighborhood** (e.g., Santa Monica, Downtown)
- **Dates** — exact check-in / check-out for a 1-month window
- **Number of guests** (usually 2 for a couple)
- **Budget ceiling** (e.g., $5,000/mo)
- **Must-haves** — things like full kitchen, walkable to a coworking space, proximity to beach, parking, pet-friendly, etc.
- **Any special considerations** — for example, scent sensitivity (HSP), accessibility needs, noise sensitivity

These criteria get encoded as `goal-tag` elements in the goal bar:
```html
<div class="goal-bar">
  <span class="goal-tag">Near WeWork (520 Broadway)</span>
  <span class="goal-tag">Walk to beach</span>
  <span class="goal-tag">Full kitchen (stove + oven)</span>
  <span class="goal-tag">HSP / scent-friendly</span>
</div>
```

---

## Step 2: Source Listings from Each Platform

Search each platform with your dates, guests, and filters. For each listing you want to include, collect this data:

| Field | Example | Notes |
|-------|---------|-------|
| **Listing name** | "Santa Monica 4" | Exact title from the platform |
| **Direct URL** | `airbnb.com/rooms/1055976?adults=2&check_in=...` | Must link to the specific listing, not search results |
| **Platform** | Airbnb / VRBO / Furnished Finder | Determines which section it goes in |
| **Property type** | Apartment, Condo, House, Bungalow | From the listing details |
| **Bedrooms/Bathrooms** | 1BR/1BA | |
| **Monthly price** | $3,345 | Total for the stay, including fees |
| **Per-night price** | ~$111/night | Monthly price / number of nights |
| **Rating + review count** | 4.67 (18 reviews) | If available |
| **Host status** | Superhost, etc. | If applicable |
| **Neighborhood** | Downtown SM, Venice, Brentwood | Relative to your target area |
| **Distance to key location** | 8 min walk to beach | Beach, office, transit, etc. |
| **One-line note** | "Best value on Airbnb in SM proper." | Your editorial take — why it's interesting or a concern |

### Platform-Specific Search Tips

**Airbnb**
- Use the "Monthly stays" tab (not nightly) — this unlocks monthly discounts
- Filter: Kitchen, Min bedrooms, Price max
- Important: Copy the `/rooms/XXXXXXX` URL, not the search results URL. Search result URLs change and won't link to the right listing later.
- Check if the same listing exists on VRBO (often cheaper due to lower host fees)

**VRBO**
- Filter: Kitchen/Kitchenette, Min bedrooms, dates
- VRBO shows total price including all fees upfront — compare apples to apples with Airbnb
- URL format: `vrbo.com/XXXXXXX?chkin=YYYY-MM-DD&chkout=YYYY-MM-DD`

**Furnished Finder**
- Designed for 1-month+ stays (traveling nurses, remote workers)
- Prices are listed monthly — no nightly math needed
- Many listings are ADUs, cottages, and guesthouses (standalone units)
- No booking fees — you contact the landlord directly
- URL format: `furnishedfinder.com/property/XXXXXX_1`

**Other Platforms to Check**
- **Landing** — Furnished apartments with flexible leases
- **SabbaticalHomes** — Homes from academics on sabbatical (great for furnished, lived-in spaces)
- **Zeus Living**, **Blueground** — Corporate furnished apartments (check Reddit for reviews before including)
- **Local hotels with kitchenettes** — Call for extended-stay rates; often negotiable for 30+ nights

---

## Step 3: Assemble the HTML

The page is a single `index.html` file with embedded CSS and JavaScript. No build tools, no frameworks.

### Page Anatomy

```
┌─────────────────────────────────┐
│           Hero Header           │  Title + date range + subtitle
├─────────────────────────────────┤
│         Goal Tags Bar           │  Your search criteria as pills
├─────────────────────────────────┤
│     Top 3 Recommendations       │  Gold / Silver / Bronze pick cards
├─────────────────────────────────┤
│     Airbnb Section              │  Platform header + listing cards
├─────────────────────────────────┤
│     VRBO Section                │  Platform header + listing cards
├─────────────────────────────────┤
│     Furnished Finder Section    │  Platform header + listing cards
├─────────────────────────────────┤
│     Other Platforms             │  Quick-reference cards (no voting)
├─────────────────────────────────┤
│     Special Considerations      │  e.g., HSP strategy, tips, templates
├─────────────────────────────────┤
│           Footer                │  Compiled date
├─────────────────────────────────┤
│     Sticky Submit Bar           │  Submit button + vote count
└─────────────────────────────────┘
```

### Listing Card Template

Each votable listing follows this structure. The `data-id` must be unique and use the prefix for its platform (`ab-` for Airbnb, `vr-` for VRBO, `ff-` for Furnished Finder, `top-` for top picks):

```html
<div class="listing" data-id="ab-1">
  <div class="listing-top">
    <div class="listing-info">
      <div class="listing-name">
        <a href="https://www.airbnb.com/rooms/XXXXXXX?adults=2&check_in=YYYY-MM-DD&check_out=YYYY-MM-DD" target="_blank">Listing Title Here</a>
      </div>
      <div class="listing-meta">Apartment · 1BR · 4.67 (18 reviews) · Superhost · Downtown SM</div>
      <div class="listing-note">Your one-line editorial note about this listing.</div>
    </div>
    <div class="listing-price">
      <div class="amount">$3,345</div>
      <div class="per-night">~$111/night</div>
    </div>
  </div>
  <div class="vote-row">
    <button class="vote-btn" onclick="vote(this,'approve')" data-choice="approve">&#10003; Approve</button>
    <button class="vote-btn" onclick="vote(this,'maybe')" data-choice="maybe">&#9679; Maybe</button>
    <button class="vote-btn" onclick="vote(this,'deny')" data-choice="deny">&#10007; Deny</button>
  </div>
</div>
```

### Top Pick Card Template

Top 3 recommendations use a richer card with medal, details list, and CTA button:

```html
<div class="pick-card gold" data-id="top-1">
  <span class="pick-medal">🥇</span>
  <div class="source">Furnished Finder</div>
  <h3>Listing Title</h3>
  <span class="price">$3,600/mo</span>
  <ul class="details">
    <li>2BR/1BA, 785 sq ft, 1-month minimum, utilities included</li>
    <li>Why this is the #1 pick — your reasoning</li>
    <li>Any action items (e.g., "Message landlord about X")</li>
  </ul>
  <a class="cta" href="https://..." target="_blank">View Listing</a>
  <div class="vote-row">
    <button class="vote-btn" onclick="vote(this,'approve')" data-choice="approve">&#10003; Approve</button>
    <button class="vote-btn" onclick="vote(this,'maybe')" data-choice="maybe">&#9679; Maybe</button>
    <button class="vote-btn" onclick="vote(this,'deny')" data-choice="deny">&#10007; Deny</button>
  </div>
</div>
```

Use class `gold` / `silver` / `bronze` and medals 🥇 / 🥈 / 🥉 for positions 1–3.

### Other Platform Card (Non-Votable)

For platforms where you're linking to a search page rather than a specific listing:

```html
<div class="other-card">
  <h4><a href="https://..." target="_blank">Platform Name</a></h4>
  <p>Brief description of what they offer</p>
  <p><strong>~$3,500–$4,500/mo</strong></p>
</div>
```

### "Avoid" Warning Card

```html
<div class="avoid-card">
  <strong>Avoid PlatformName</strong> — Reason why (e.g., bad Reddit reviews, hidden fees).
</div>
```

---

## Step 4: Wire Up the Vote System

### The Votes Object

At the bottom of the HTML in the `<script>` tag, the `votes` object stores every vote. Keys match the `data-id` attributes. Values are `'approve'`, `'maybe'`, or `'deny'`:

```javascript
var votes = {
  'ab-1': 'deny',
  'ab-2': 'approve',
  'vr-1': 'maybe',
  'ff-1': 'approve',
  'top-1': 'approve',
  'top-2': 'deny',
  'top-3': 'approve'
};
```

This object is what gets persisted when you click Submit. The serverless function finds this block in the HTML via regex and replaces it with the updated votes.

### Update the Listing Count

The `totalListings` variable is auto-calculated from `data-id` attributes, and the submit bar shows "X of Y listings rated." No manual count needed.

---

## Step 5: Deploy to Vercel with Persistent Saves

### Repo Structure

```
├── index.html          # The full page (HTML + CSS + JS)
├── api/
│   └── save-votes.js   # Vercel serverless function
└── README.md           # This guide
```

### Setting Up the Serverless Function

The `api/save-votes.js` function handles POST requests from the Submit button. It:

1. Receives the current `votes` object from the browser
2. Fetches the latest `index.html` from GitHub (via the Contents API)
3. Replaces the `var votes = {...};` block with the new votes
4. Commits the updated file back to GitHub
5. Vercel auto-redeploys from the new commit

This means votes survive page refreshes and are visible to anyone with the link.

### Environment Variable

The serverless function needs a `GITHUB_TOKEN` environment variable in your Vercel project settings:

1. Generate a GitHub personal access token with `repo` scope
2. In Vercel dashboard → Project → Settings → Environment Variables
3. Add `GITHUB_TOKEN` with the token value

### Deployment

1. Push the repo to GitHub
2. Import the repo in Vercel (vercel.com → New Project)
3. Vercel auto-detects the static site + serverless function
4. Every push to `main` triggers a redeploy

---

## Adapting for a Different City

To reuse this template for a new city or trip:

1. **Update the hero** — city name, date range, subtitle
2. **Update goal tags** — your new search criteria
3. **Replace all listings** — source fresh listings per Step 2
4. **Pick new Top 3** — your best recommendations with reasoning
5. **Update the HSP / special section** — or remove it if not applicable
6. **Reset the votes object** — start with an empty `var votes = {};`
7. **Update the "Browse all" links** — point to your new search URLs for each platform
8. **Update the repo name** in `api/save-votes.js` if deploying a separate repo

### ID Conventions

- `ab-1`, `ab-2`, ... for Airbnb
- `vr-1`, `vr-2`, ... for VRBO
- `ff-1`, `ff-2`, ... for Furnished Finder
- `top-1`, `top-2`, `top-3` for Top Picks
- Add more prefixes as needed (e.g., `ld-` for Landing, `sh-` for SabbaticalHomes)

---

## Tips

- **Always use direct listing URLs**, not search result pages. Search URLs change and break.
- **Cross-reference platforms** — the same property often appears on both Airbnb and VRBO at different prices. Note this in the listing's editorial note.
- **Monthly price is king** — some platforms show nightly rates, others show totals. Normalize everything to the monthly total including fees for fair comparison.
- **Add editorial notes** — the one-line note under each listing is the most valuable part. It's your quick take: why it's interesting, what the catch is, or what to ask the host about.
- **The Top 3 should tell a story** — pick your #1 best overall, a budget-friendly runner-up, and a "splurge" or unique option. Explain *why* in the details bullets.