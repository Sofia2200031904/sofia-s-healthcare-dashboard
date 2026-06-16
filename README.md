# Sofia's<img width="1536" height="1024" alt="Tech Care Healthcare Dashboard" src="https://github.com/user-attachments/assets/e7a4cb4e-62fe-4dac-bb24-0d41059c1fd7" />

Responsive React single-page dashboard developed for the Coalition Technologies Front-End Developer Skills Assessment.

## Overview

This application recreates a healthcare dashboard interface using React and Vite. The dashboard retrieves patient information from the Coalition Technologies Patient Data API and displays healthcare insights for Jessica Taylor, including diagnosis history, blood pressure trends, vital signs, diagnostic records, and laboratory results.

## Features

* Responsive single-page application
* Patient profile dashboard
* Blood pressure trend visualization using Chart.js
* Diagnosis history section
* Vital statistics cards
* Diagnostic list management
* Laboratory results section
* Component-based React architecture
* API-driven data rendering

## Technology Stack

* React.js
* Vite
* JavaScript (ES6+)
* Axios
* Chart.js
* CSS3

## API Integration

The application uses the Coalition Technologies Patient Data API to retrieve patient information. The dashboard filters and displays data specifically for Jessica Taylor, including:

* Profile information
* Diagnosis history
* Blood pressure readings
* Vital signs
* Diagnostic records
* Laboratory results

## Installation

```bash
npm install
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── PatientProfile.jsx
│   ├── DiagnosisHistory.jsx
│   ├── BloodPressureChart.jsx
│   ├── DiagnosticList.jsx
│   └── LabResults.jsx
├── services/
│   └── api.js
├── styles/
│   └── main.css
├── App.jsx
└── main.jsx
```

## Build

```bash
npm run build
```

## Public URL 

**https://sofia-s-healthcare-dashboard.vercel.app/**

