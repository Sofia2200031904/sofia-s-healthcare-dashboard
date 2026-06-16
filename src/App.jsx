import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import PatientProfile from './components/PatientProfile.jsx';
import DiagnosisHistory from './components/DiagnosisHistory.jsx';
import DiagnosticList from './components/DiagnosticList.jsx';
import LabResults from './components/LabResults.jsx';
import { getJessicaDashboardData } from './services/api.js';

function App() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);
  const [diagnostics, setDiagnostics] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [activeSection, setActiveSection] = useState('Patients');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const sectionRefs = {
    Overview: useRef(null),
    Patients: useRef(null),
    Schedule: useRef(null),
    Message: useRef(null),
    Transactions: useRef(null)
  };

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setStatus('loading');
        const data = await getJessicaDashboardData();

        if (!isMounted) return;

        setPatients(data.patients);
        setPatient(data.patient);
        setDiagnostics(
          data.patient.diagnostic_list.map((item, index) => ({
            ...item,
            id: `${item.name}-${item.status}-${index}`
          }))
        );
        setLabResults(
          data.patient.lab_results.map((name, index) => ({
            id: `${name}-${index}`,
            name
          }))
        );
        setStatus('ready');
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Unable to load dashboard data.');
        setStatus('error');
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const latestDiagnosis = useMemo(() => patient?.diagnosis_history?.[0], [patient]);

  function handleNavigate(section) {
    setActiveSection(section);
    const target = sectionRefs[section]?.current;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    }
  }

  function addDiagnostic(item) {
    setDiagnostics((current) => [{ ...item, id: crypto.randomUUID() }, ...current]);
  }

  function updateDiagnostic(id, item) {
    setDiagnostics((current) =>
      current.map((diagnostic) =>
        diagnostic.id === id ? { ...diagnostic, ...item } : diagnostic
      )
    );
  }

  function deleteDiagnostic(id) {
    setDiagnostics((current) => current.filter((diagnostic) => diagnostic.id !== id));
  }

  function addLabResult(name) {
    setLabResults((current) => [{ id: crypto.randomUUID(), name }, ...current]);
  }

  function updateLabResult(id, name) {
    setLabResults((current) =>
      current.map((result) => (result.id === id ? { ...result, name } : result))
    );
  }

  function deleteLabResult(id) {
    setLabResults((current) => current.filter((result) => result.id !== id));
  }

  return (
    <div className="app-shell">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {status === 'loading' && (
        <main className="state-view" aria-live="polite">
          <div className="loader" aria-hidden="true" />
          <p>Loading Jessica Taylor&apos;s dashboard...</p>
        </main>
      )}

      {status === 'error' && (
        <main className="state-view state-view--error" role="alert">
          <h1>Dashboard unavailable</h1>
          <p>{error}</p>
        </main>
      )}

      {status === 'ready' && patient && (
        <main className="dashboard" aria-label="Jessica Taylor healthcare dashboard">
          <div ref={sectionRefs.Patients} tabIndex="-1">
            <Sidebar patients={patients} activePatientName={patient.name} />
          </div>

          <section
            className="dashboard__main"
            aria-label="Clinical overview"
            ref={sectionRefs.Overview}
            tabIndex="-1"
          >
            <DiagnosisHistory history={patient.diagnosis_history} latestDiagnosis={latestDiagnosis} />
            <DiagnosticList
              diagnostics={diagnostics}
              onAdd={addDiagnostic}
              onUpdate={updateDiagnostic}
              onDelete={deleteDiagnostic}
            />
          </section>

          <aside className="dashboard__aside" aria-label="Patient details and lab results">
            <PatientProfile patient={patient} />
            <LabResults
              results={labResults}
              onAdd={addLabResult}
              onUpdate={updateLabResult}
              onDelete={deleteLabResult}
            />
            <section
              className="quick-panel card"
              aria-labelledby="schedule-title"
              ref={sectionRefs.Schedule}
              tabIndex="-1"
            >
              <h2 id="schedule-title">Schedule</h2>
              <p>Next review: March 2024 diagnosis follow-up.</p>
            </section>
            <section
              className="quick-panel card"
              aria-labelledby="message-title"
              ref={sectionRefs.Message}
              tabIndex="-1"
            >
              <h2 id="message-title">Message</h2>
              <p>Jessica Taylor&apos;s dashboard is ready for care team review.</p>
            </section>
            <section
              className="quick-panel card"
              aria-labelledby="transactions-title"
              ref={sectionRefs.Transactions}
              tabIndex="-1"
            >
              <h2 id="transactions-title">Transactions</h2>
              <p>Insurance provider: {patient.insurance_type}.</p>
            </section>
          </aside>
        </main>
      )}
    </div>
  );
}

export default App;
