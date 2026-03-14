# Trip Cost Calculator

A lightweight front-end web app that estimates intercity trip cost using OpenRouteService (ORS).

## What this project does

The app takes a **starting location** and **destination**, then:
- Geocodes both place names using ORS geocoding API.
- Fetches a driving route between those coordinates.
- Computes estimated cost using:
  - Distance charge: **₹19/km**
  - Driver allowance: **₹300 per 8-hour driving day**
- Displays:
  - Total distance
  - Travel time
  - Distance cost
  - Driver allowance
  - Total estimated cost

> Note: Toll and parking are explicitly excluded in both UI and calculation.

## Tech stack

- **HTML + Tailwind CSS (CDN)** for layout and responsive styling
- **Vanilla JavaScript** for API integration and calculation logic
- **OpenRouteService APIs**:
  - `/geocode/search`
  - `/v2/directions/driving-car/geojson`

## Project structure

```text
.
├── README.md
└── EXP13/
    ├── index.html      # UI markup + some inline styles + Tailwind config
    ├── styles.css      # supplemental styles (currently mostly duplicated by inline CSS)
    ├── scripts.js      # API calls, validation, calculations, and rendering
    └── favicon.ico
```

## How the app works (code walkthrough)

1. **Page loads** and `DOMContentLoaded` initializes UI references and constants.
2. Clicking **Calculate Cost** triggers `handleCalculation()`.
3. Inputs are validated (both start and destination required).
4. App geocodes both places in parallel with `Promise.all()`.
5. App requests driving route from ORS directions API.
6. `calculateCosts()` computes:
   - `distanceKm = distanceMeters / 1000`
   - `distanceCost = distanceKm * 19`
   - `days = ceil(durationSeconds / (8 * 60 * 60))`
   - `driverAllowance = days * 300`
   - `totalCost = distanceCost + driverAllowance`
7. Results are formatted and rendered in INR and human-readable duration.
8. Loading and error states are shown/hidden as needed.

## Running locally

Because this is a static app, you can run it by either:

### Option 1: Open directly
Open `EXP13/index.html` in a browser.

### Option 2 (recommended): Use a local static server
From repo root:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080/EXP13/
```

## Configuration

In `EXP13/scripts.js`:
- `DISTANCE_RATE_PER_KM` (default: `19`)
- `DRIVER_ALLOWANCE_PER_DAY` (default: `300`)
- `ORS_API_KEY`

### Important security note
The current implementation places the ORS API key directly in client-side JavaScript, which exposes it publicly to anyone opening DevTools.

For production use, move ORS calls behind a backend/proxy endpoint and keep the API key server-side.

## Known limitations

- Requires reasonably accurate place names for successful geocoding.
- No autocomplete/suggestions for location input.
- No toll/parking estimation logic.
- No map visualization (this version displays calculated metrics only).
- `index.html` references `styles.css` with `rel="stylesheets"` (should be `stylesheet`); currently many styles still work because key styles are embedded inline and via Tailwind CDN.

## Suggested improvements

- Add location autocomplete.
- Add map route visualization (e.g., Leaflet/MapLibre).
- Add backend key protection.
- Add basic automated tests for cost calculation utility.
- Refactor styling to avoid duplication between inline CSS and `styles.css`.

## Credits

- Routing/geocoding powered by [OpenRouteService](https://openrouteservice.org/)
- UI utility classes powered by [Tailwind CSS CDN](https://tailwindcss.com/)
