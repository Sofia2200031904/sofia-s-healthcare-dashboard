# Sofia's Tech.Care Healthcare Dashboard

Responsive React single-page dashboard for the Coalition Technologies FED skills test. The app fetches live patient data, filters the detailed dashboard to Jessica Taylor, renders the diagnosis history, blood pressure chart, vitals, diagnostics, profile, and lab results, and includes local CRUD controls for diagnostic and lab records.

## Setup

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

Default local URL:

```text
http://localhost:5173/
```

## API

The app uses the Coalition Technologies Patient Data API:

- URL: `https://fedskillstest.coalitiontechnologies.workers.dev`
- Authentication: Basic auth
- Default username: `coalition`
- Default password: `skills-test`

Optional environment overrides:

```bash
VITE_PATIENT_API_URL=
VITE_API_USERNAME=
VITE_API_PASSWORD=
```

Jessica Taylor's profile, vitals, diagnosis history, diagnostic list, and lab results are loaded from this API. The blood pressure chart uses Jessica Taylor's API `diagnosis_history` values. CRUD edits are local browser state only because the provided API is read-only and does not include POST, PUT, PATCH, or DELETE endpoints.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## GitHub Upload

Create a repository on GitHub first, then run:

```bash
git init
git add .
git commit -m "Build Sofia's Tech.Care dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

If the folder is already connected to GitHub, use:

```bash
git status
git add .
git commit -m "Update dashboard interactions and CRUD"
git push
```

## Deploy

Recommended: deploy on Vercel because this is a Vite React app.

1. Push the project to GitHub.
2. Go to [Vercel](https://vercel.com/new).
3. Import the GitHub repository.
4. Use these settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click Deploy.

Netlify also works:

1. Go to [Netlify](https://app.netlify.com/start).
2. Import the GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

## Structure

```text
src/
  components/
    Sidebar.jsx
    Header.jsx
    PatientProfile.jsx
    DiagnosisHistory.jsx
    BloodPressureChart.jsx
    DiagnosticList.jsx
    LabResults.jsx
  services/
    api.js
  styles/
    main.css
  App.jsx
  main.jsx
```
