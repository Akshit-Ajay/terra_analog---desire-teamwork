# TERRA-ANALOG — Start here

This is the adapted local project. The measured data is already included; you do **not** need to run the large data-download pipeline just to launch the app.

## Fastest start on Windows 10/11

1. Install **Python 3.11 or newer** and **Node.js 18 or newer** (Node 22 is recommended).
2. Extract the complete ZIP to a normal folder, for example `C:\Projects\TERRA-ANALOG`. Do not run it from inside the ZIP preview.
3. Double-click `start_windows.bat` and allow the first setup to finish. It installs the Python API dependencies and the frontend npm dependencies. Internet access is needed for this one-time setup.
4. Two terminal windows will open. Keep both open while using the app.
5. Open **http://localhost:5173** in your browser. The API health check is at **http://127.0.0.1:8000/api/health**.
6. To stop the app, close both terminal windows.

If Windows says Python or npm is not recognised, install Python/Node.js, enable the option to add them to PATH, then reopen the terminal and try again.

## Manual start (if the batch file does not work)

Open two terminals at the project root.

**Terminal 1 — API**

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir backend --reload --port 8000
```

**Terminal 2 — frontend**

```powershell
cd frontend
npm ci
npm run dev
```

Then visit http://localhost:5173.

## What is included

- Moon and Mars reference-region explorer
- Earth terrain-similarity ranking and configurable feature weights
- Interactive map, ranked candidate list and candidate details
- Candidate comparison view
- Data-source, methodology and limitation pages
- Processed terrain dataset and hillshade images
- FastAPI backend and React/TypeScript frontend

## Scientific scope — read before presenting

The default similarity score is **terrain-only**. It compares measured terrain statistics (relief, slope, roughness, hypsometry and slope distribution). Thermal and mineral observations are supplementary context; they are not a combined temperature/geology/aridity score. The score is not a probability, landing-site recommendation, safety assessment or habitability judgement. Read the in-app **Data & methods** page and the project README before presenting results.

## Attribution and licence status

This is a student adaptation of the Terrestrial Analog Finder repository by team ghostblood: https://github.com/shishir-kuet/terrestrial-analog-finder . The upstream ZIP supplied for this adaptation did not include a software licence. Keep this copy private and do not redistribute or publicly deploy the adapted source until the original owner grants permission or clarifies licensing. Dataset licences and attributions remain separate and must be retained.

## Verification status

- Backend automated tests: 80 passed in the build environment.
- Frontend production build and browser-based tests: not yet verified here because npm dependency installation timed out in the build environment. Run `npm ci`, `npm run build`, and `npm test` on a machine with working npm registry access before public release.
- Local runtime and public deployment: not yet verified.
