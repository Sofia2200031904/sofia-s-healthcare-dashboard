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


