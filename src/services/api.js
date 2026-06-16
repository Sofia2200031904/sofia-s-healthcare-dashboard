const API_URL =
  import.meta.env.VITE_PATIENT_API_URL ||
  'https://fedskillstest.coalitiontechnologies.workers.dev';
const API_USERNAME = import.meta.env.VITE_API_USERNAME || 'coalition';
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD || 'skills-test';
const TARGET_PATIENT = 'Jessica Taylor';

function getAuthHeader() {
  const token = btoa(`${API_USERNAME}:${API_PASSWORD}`);
  return `Basic ${token}`;
}

export async function fetchPatients() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: getAuthHeader()
    }
  });

  if (!response.ok) {
    throw new Error(`Patient API request failed with status ${response.status}.`);
  }

  return response.json();
}

export async function getJessicaDashboardData() {
  const patients = await fetchPatients();
  const patient = patients.find(({ name }) => name === TARGET_PATIENT);

  if (!patient) {
    throw new Error(`${TARGET_PATIENT} was not found in the patient API response.`);
  }

  return { patients, patient };
}
