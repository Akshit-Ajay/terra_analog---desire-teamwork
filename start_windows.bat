@echo off
setlocal
cd /d "%~dp0"

echo ==========================================
echo          TERRA-ANALOG quick start
echo ==========================================

where py >nul 2>nul
if errorlevel 1 (
  echo ERROR: Python launcher 'py' was not found. Install Python 3.11+ and enable PATH.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm was not found. Install Node.js 18+ and reopen this window.
  pause
  exit /b 1
)

if not exist ".venv\Scripts\python.exe" (
  echo [1/4] Creating Python virtual environment...
  py -3 -m venv .venv
  if errorlevel 1 goto failed
)

echo [2/4] Installing/checking backend dependencies...
.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
if errorlevel 1 goto failed

if not exist "frontend\node_modules" (
  echo [3/4] Installing frontend dependencies (first run can take a few minutes)...
  pushd frontend
  call npm ci
  if errorlevel 1 (popd & goto failed)
  popd
) else (
  echo [3/4] Frontend dependencies already present; skipping npm ci.
)

echo [4/4] Starting API and frontend in separate windows...
start "TERRA-ANALOG API" cmd /k "cd /d ""%~dp0backend"" && ..\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"
start "TERRA-ANALOG Frontend" cmd /k "cd /d ""%~dp0frontend"" && npm run dev"

echo.
echo Open http://localhost:5173 in your browser.
echo Keep both new terminal windows open while using the app.
echo.
pause
exit /b 0

:failed
echo.
echo Setup did not complete. Read the error above, fix it, and run this file again.
pause
exit /b 1
