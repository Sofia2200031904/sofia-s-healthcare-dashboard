import { MoreHorizontal, Search } from 'lucide-react';

function Sidebar({ patients, activePatientName }) {
  return (
    <aside className="sidebar card" aria-label="Patients">
      <div className="section-heading section-heading--compact">
        <h1>Patients</h1>
        <button className="icon-button" type="button" aria-label="Search patients">
          <Search size={19} aria-hidden="true" />
        </button>
      </div>

      <ul className="patient-list" aria-label="Patient list">
        {patients.map((patient) => {
          const isActive = patient.name === activePatientName;

          return (
            <li
              className={`patient-row${isActive ? ' patient-row--active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              key={patient.name}
            >
              <img src={patient.profile_picture} alt="" className="patient-row__avatar" />
              <div className="patient-row__copy">
                <strong>{patient.name}</strong>
                <span>
                  {patient.gender}, {patient.age}
                </span>
              </div>
              <button
                className="icon-button patient-row__menu"
                type="button"
                aria-label={`${patient.name} options`}
              >
                <MoreHorizontal size={18} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
