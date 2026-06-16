import { HeartPulse, Thermometer, TrendingDown, TrendingUp, Wind } from 'lucide-react';
import BloodPressureChart from './BloodPressureChart.jsx';

const vitalConfig = [
  {
    key: 'respiratory_rate',
    title: 'Respiratory Rate',
    unit: 'bpm',
    icon: Wind,
    className: 'vital-card--blue'
  },
  {
    key: 'temperature',
    title: 'Temperature',
    unit: 'F',
    icon: Thermometer,
    className: 'vital-card--pink'
  },
  {
    key: 'heart_rate',
    title: 'Heart Rate',
    unit: 'bpm',
    icon: HeartPulse,
    className: 'vital-card--rose'
  }
];

function TrendIcon({ level }) {
  if (level === 'Higher than Average') {
    return <TrendingUp size={12} aria-hidden="true" />;
  }

  if (level === 'Lower than Average') {
    return <TrendingDown size={12} aria-hidden="true" />;
  }

  return null;
}

function DiagnosisHistory({ history, latestDiagnosis }) {
  return (
    <section className="history card" aria-labelledby="history-title">
      <div className="section-heading">
        <h2 id="history-title">Diagnosis History</h2>
      </div>

      <BloodPressureChart history={history} latestDiagnosis={latestDiagnosis} />

      <div className="vital-grid" aria-label="Current vital statistics">
        {vitalConfig.map(({ key, title, unit, icon: Icon, className }) => {
          const vital = latestDiagnosis?.[key];

          return (
            <article className={`vital-card ${className}`} key={key}>
              <span className="vital-card__icon" aria-hidden="true">
                <Icon size={34} strokeWidth={1.7} />
              </span>
              <p className="vital-card__label">{title}</p>
              <p className="vital-card__value">
                {vital?.value}
                <span>{unit === 'F' ? String.fromCharCode(176) + unit : ` ${unit}`}</span>
              </p>
              <p className="vital-card__level">
                <TrendIcon level={vital?.levels} />
                {vital?.levels}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default DiagnosisHistory;
