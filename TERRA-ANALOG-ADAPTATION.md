# TERRA-ANALOG — adaptation notes

This working copy adapts the downloaded **Terrestrial Analog Finder** project for the TERRA-ANALOG student hackathon presentation.

## What has been changed in this adaptation

- Rebranded the visible application name to **TERRA-ANALOG**.
- Updated the browser title and description.
- Updated the footer to identify this as a student adaptation and retain attribution to the original project team, **team ghostblood**.
- Kept the underlying terrain-scoring methodology, measured datasets, provenance, and scientific limitations intact.

## Important scientific scope

The existing application primarily ranks terrain similarity using measured digital-elevation-model features. Its default score is **terrain-only**. Thermal and mineral information is supplementary; thermal inertia has a default weight of zero. Do not describe the existing score as a combined temperature + terrain + geology + aridity score. Do not present a similarity index as a probability, landing-site recommendation, safety assessment, or habitability judgement.

## Verification status in this workspace

- Backend automated tests: **80 passed** (`pytest -q` in `backend/`).
- Frontend production build: **not verified**. `npm ci` timed out in this build environment, so TypeScript/Vite build and frontend tests still need to be run on a computer with working npm registry access.
- Windows quick-start guide and `start_windows.bat` have been added. The script installs runtime dependencies and opens separate API/frontend terminal windows.
- Deployment: **not yet deployed**. The app needs a successful local run and a hosting configuration check before it can be called live.

## Licensing and attribution warning

The supplied ZIP did not contain a `LICENSE` file. A public GitHub repository without an explicit licence is not automatically open-source, and downloading its ZIP does not grant permission to redistribute or publish modified copies. Keep this adaptation private until the original repository owner confirms a licence or grants permission. Preserve the original team's attribution and all dataset citations. Add the exact upstream repository URL and licence details here once verified.

## Next steps before public release

1. Confirm the upstream GitHub URL and licence with the repository owner.
2. Install frontend dependencies with `npm ci` inside `frontend/`.
3. Run `npm run build` and `npm test` inside `frontend/`.
4. Start the API and frontend locally; check map tiles, API calls, candidate selection, comparisons, and methodology pages.
5. Review all data citations and the NASA/ESA/USGS non-endorsement disclaimer.
6. Only then publish to a GitHub repository and deploy.
