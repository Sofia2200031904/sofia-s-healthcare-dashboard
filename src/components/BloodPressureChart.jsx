import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import { ChevronDown } from 'lucide-react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const MONTHS = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec'
};

function getChartHistory(history) {
  return [...history].slice(0, 6).reverse();
}

function LegendReading({ label, color, value, level }) {
  return (
    <div className="bp-reading">
      <p className="bp-reading__label">
        <span style={{ backgroundColor: color }} aria-hidden="true" />
        {label}
      </p>
      <strong>{value}</strong>
      <small>{level}</small>
    </div>
  );
}

function BloodPressureChart({ history, latestDiagnosis }) {
  const chartHistory = getChartHistory(history);
  const labels = chartHistory.map(({ month, year }) => `${MONTHS[month]} ${year}`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: chartHistory.map((item) => item.blood_pressure.systolic.value),
        borderColor: '#E66FD2',
        backgroundColor: '#E66FD2',
        borderWidth: 2,
        pointBackgroundColor: '#E66FD2',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 5,
        tension: 0.42
      },
      {
        label: 'Diastolic',
        data: chartHistory.map((item) => item.blood_pressure.diastolic.value),
        borderColor: '#8C6FE6',
        backgroundColor: '#8C6FE6',
        borderWidth: 2,
        pointBackgroundColor: '#8C6FE6',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 5,
        tension: 0.42
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#072635',
        displayColors: true,
        padding: 10,
        titleFont: { family: 'Manrope', size: 12, weight: 700 },
        bodyFont: { family: 'Manrope', size: 12 }
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        border: { display: false },
        ticks: {
          color: '#707070',
          font: { family: 'Manrope', size: 12 },
          maxRotation: 0
        }
      },
      y: {
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          color: '#707070',
          font: { family: 'Manrope', size: 12 }
        },
        border: { display: false },
        grid: {
          color: '#CBC8D4',
          drawTicks: false
        }
      }
    }
  };

  const pressure = latestDiagnosis?.blood_pressure;

  return (
    <article className="bp-panel" aria-label="Blood pressure chart">
      <div className="bp-panel__header">
        <h3>Blood Pressure</h3>
        <button className="bp-panel__range" type="button" aria-label="Chart range: Last 6 months">
          Last 6 months
          <ChevronDown size={14} aria-hidden="true" />
        </button>
      </div>

      <div className="bp-panel__body">
        <div className="bp-chart">
          <Line data={data} options={options} />
        </div>

        <div className="bp-legend" aria-label="Latest blood pressure readings">
          <LegendReading
            label="Systolic"
            color="#E66FD2"
            value={pressure?.systolic.value}
            level={pressure?.systolic.levels}
          />
          <LegendReading
            label="Diastolic"
            color="#8C6FE6"
            value={pressure?.diastolic.value}
            level={pressure?.diastolic.levels}
          />
        </div>
      </div>
    </article>
  );
}

export default BloodPressureChart;
