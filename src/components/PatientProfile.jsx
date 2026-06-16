import {
  CalendarDays,
  Phone,
  ShieldCheck,
  UserRound
} from 'lucide-react';

const detailIcons = {
  date_of_birth: CalendarDays,
  gender: UserRound,
  phone_number: Phone,
  emergency_contact: Phone,
  insurance_type: ShieldCheck
};

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

function PatientProfile({ patient }) {
  const details = [
    { key: 'date_of_birth', label: 'Date Of Birth', value: formatDate(patient.date_of_birth) },
    { key: 'gender', label: 'Gender', value: patient.gender },
    { key: 'phone_number', label: 'Contact Info.', value: patient.phone_number },
    { key: 'emergency_contact', label: 'Emergency Contacts', value: patient.emergency_contact },
    { key: 'insurance_type', label: 'Insurance Provider', value: patient.insurance_type }
  ];

  return (
    <section className="profile-card card" aria-labelledby="profile-title">
      <img src={patient.profile_picture} alt={patient.name} className="profile-card__photo" />
      <h2 id="profile-title">{patient.name}</h2>

      <dl className="profile-details">
        {details.map(({ key, label, value }) => {
          const Icon = detailIcons[key] || UserRound;
          return (
            <div className="profile-details__item" key={key}>
              <dt>
                <span className="profile-details__icon" aria-hidden="true">
                  <Icon size={17} strokeWidth={1.9} />
                </span>
                <span>{label}</span>
              </dt>
              <dd>{value}</dd>
            </div>
          );
        })}
      </dl>

      <button className="profile-card__button" type="button">
        Show All Information
      </button>
    </section>
  );
}

export default PatientProfile;
