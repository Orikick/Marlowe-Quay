# Marlowe & Quay — homes for sale in Lisbon

Developed by **Orest Labiak**.

**Live demo:** https://marlowe-n-quay.netlify.app/

<!-- Screenshots: save them to the docs/ folder with these names, then delete this comment's first and last lines.
![Desktop view](docs/screenshot-desktop.png)
![Mobile view](docs/screenshot-mobile.png)
-->

A real-estate listing site for **Marlowe & Quay**, a fictional independent estate agency in Lisbon.
Visitors browse 30 homes in a split view (cards on the left, a map on the right), narrow them down
with filters that live in the URL, open a details page with a gallery, specs, a location map and a
contact form, and keep a shortlist of saved homes in the browser.

The agency, agents, listings and prices are invented. Map data comes from OpenStreetMap; photos
come from Unsplash.

## Stack

- [Vite 7](https://vite.dev) + [React 19](https://react.dev) (JavaScript)
- [React Router 7](https://reactrouter.com) (`react-router-dom`)
- [Leaflet](https://leafletjs.com) + [React Leaflet 5](https://react-leaflet.js.org) with OpenStreetMap tiles
- SCSS modules ([Sass](https://sass-lang.com)), with shared variables and mixins
- No UI library, no state library: React context for saved homes, the URL for filters

## How to run

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build at http://localhost:4173
```

For a Lighthouse check, run it against `npm run build && npm run preview`, not the dev server.

When deploying, send every unknown path to `index.html` so links like `/property/alfama-river-view-apartment`
work on reload (on Netlify: a `_redirects` file with `/* /index.html 200`; on Vercel: a rewrite to `/`).

### Demo switches

| Try this | What happens |
|---|---|
| Add `?fail=1` to any page URL | Loading fails and the error state appears; **Try again** loads the data |
| Send the contact form with an email ending `@example.invalid` | The form shows its "message was not sent" state |
| Open `/property/does-not-exist` | The "no longer listed" state |
| Open `/agents/does-not-exist` | The "agent not found" state |
| Filter to an impossible range, e.g. `/?minPrice=90000000` | The "no homes match" empty state |

## Features

**Listings (`/`)**
- Split view from 768px: cards on the left, a sticky map on the right
- Below 768px, a floating **List / Map** toggle switches between the two; the choice is kept in the URL (`?view=map`)
- One price marker per home; hovering or focusing a card highlights its marker
- Clicking a marker scrolls to its card and outlines it; with the keyboard (Enter or Space on a focused marker) focus also moves to the card
- In mobile map view, choosing a marker opens a preview card with a link to the home
- The map fits itself to the homes that match the current filters
- Leaflet loads in its own chunk, and phones in list view never download it

**Filters**
- Property type (multi-select), price range, minimum rooms, living-area range, and sort order
- Every filter is a URL query parameter, e.g. `/?type=apartment,penthouse&maxPrice=900000&rooms=3&sort=price-asc`,
  so filtered views can be bookmarked and shared, and Back / Forward step through filter changes
- Range inputs commit after typing pauses, and refuse a "from" value higher than "to"
- Active filters appear as removable chips, with **Clear all**
- The results count is a polite live region, so screen readers hear each new count

**Property details (`/property/:id`)**
- Photo gallery with previous / next buttons, thumbnails and arrow-key support
- Key facts (rooms, bedrooms, bathrooms, area, price per m², floor, year built, energy rating) and features
- Location map with a single pin
- The agent's card and a contact form with inline validation, focus on the first invalid field, and submitting, success and error states
- "Back to results" returns to the exact filtered list the visitor came from

**Agent profiles (`/agents/:id`)**
- The agent block on every details page links to that agent's profile
- The profile shows the agent's details, call and email buttons, a summary (number of homes,
  price range, neighbourhoods) and every home they are selling, newest first
- Opening a home from the profile gives a "Back to the agent's homes" link, and the profile links back to the home it was opened from
- Loading, empty, error and "agent not found" states

**Saved homes (`/favorites`)**
- Heart button on every card and on the details page
- Saved in `localStorage`, kept in sync across open tabs, with a count in the header
- Loading, empty and error states

**Quality**
- Responsive at 360px, 768px and 1280px+; no horizontal scrolling at any width
- Semantic HTML: landmarks, one `h1` per page, lists, description lists, fieldsets with legends
- Accessibility: skip link, visible focus rings, labelled controls, error messages tied to fields with
  `aria-describedby`, toggle buttons with `aria-pressed`, live regions for counts and status, and
  `prefers-reduced-motion` respected
- Loading skeletons with fixed aspect ratios to avoid layout shift; images use `srcset`, lazy loading
  and a neutral placeholder if a photo fails to load
- Every page except the landing page, and both maps, are code-split

## Project structure

```
src/
├── main.jsx                 # entry: router, saved-homes provider, global styles
├── App.jsx                  # routes (pages after the first are lazy-loaded)
├── styles/                  # _variables, _mixins, global.scss, leaflet-theme.scss
├── data/                    # properties.json (30 homes), agents.json, filterOptions.js
├── services/api.js          # mock async API over the JSON, with demo failures
├── context/                 # FavoritesContext (localStorage)
├── hooks/                   # useFetch, useProperties, useProperty, useAgent, useFilters (URL),
│                            # useFavorites, useLocalStorage, useMediaQuery, useDebounce,
│                            # useBackLink, useDocumentTitle
├── utils/                   # filter/sort functions, URL param parsing, formatters
├── components/
│   ├── layout/              # Header, Footer, Layout, SkipLink, ScrollToTop
│   ├── ui/                  # Button, Container, Badge, Field, Input, Select, Textarea,
│   │                        # RangeField, ChoiceGroup, Skeleton, Spinner, EmptyState,
│   │                        # ErrorState, ErrorBoundary, ResponsiveImage, Icon
│   ├── property/            # PropertyCard, PropertyCardSkeleton, PropertyList,
│   │                        # PhotoGallery, PropertySpecs, FavoriteButton, PriceTag
│   ├── filters/             # FilterBar, TypeFilter, PriceFilter, RoomsFilter, AreaFilter,
│   │                        # SortSelect, ActiveFilters
│   ├── map/                 # ListingsMap, PriceMarker, MapPreviewCard, LocationMap, MapFallback
│   ├── listings/            # SplitView, ViewToggle, ResultsCount
│   └── contact/             # ContactAgentForm, AgentCard, AgentAvatar
└── pages/                   # Listings, PropertyDetails, AgentProfile, Favorites, NotFound
```

Each component lives in its own folder with a `.jsx` file and, where it has styles, a `.module.scss` file.

## Data

`src/data/properties.json` holds 30 homes. Each has:

```json
{
  "id": "alfama-river-view-apartment",
  "title": "Two-bedroom apartment with river views",
  "type": "apartment",
  "price": 545000,
  "rooms": 3,
  "bedrooms": 2,
  "bathrooms": 1,
  "area": 78,
  "address": { "street": "Rua dos Remédios 112", "neighbourhood": "Alfama", "postcode": "1100-453", "city": "Lisboa" },
  "coordinates": { "lat": 38.7128, "lng": -9.1262 },
  "photos": [{ "src": "https://images.unsplash.com/photo-…", "alt": "Bright living room with large windows" }]
}
```

plus `floor`, `yearBuilt`, `energyRating`, `description`, `features`, `agentId` and `listedAt`.
"Rooms" counts living rooms and bedrooms, following the Portuguese T-numbering habit (a T2 has 3 rooms).

## Credits

- Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- Photos from [Unsplash](https://unsplash.com), used under the Unsplash License
- Fonts: Bricolage Grotesque and Instrument Sans from Google Fonts

## Code quality

```bash
npm run lint          # check the code with ESLint
npm run lint:fix      # fix what ESLint can fix automatically
npm run format        # format every file with Prettier
npm run format:check  # check formatting without changing files
```

ESLint uses the recommended JavaScript rules plus the React Hooks rules (`eslint.config.js`).
Prettier settings are in `.prettierrc.json`.
