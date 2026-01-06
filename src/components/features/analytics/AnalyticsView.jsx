import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from '@components/common/Card';
import { calculateBudgetByGenre, calculateStageDistribution } from '@utils/helpers';
import './AnalyticsView.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function AnalyticsView({ projects }) {
  const budgetByGenre = calculateBudgetByGenre(projects);
  const stageDistribution = calculateStageDistribution(projects);

  const budgetChartData = {
    labels: Object.keys(budgetByGenre),
    datasets: [
      {
        label: 'Budget ($M)',
        data: Object.values(budgetByGenre),
        backgroundColor: '#E50914',
        borderColor: '#FFD700',
        borderWidth: 2,
      },
    ],
  };

  const budgetChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: {
            family: 'IBM Plex Mono',
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#b3b3b3',
          font: {
            family: 'IBM Plex Mono',
          },
        },
        grid: {
          color: 'rgba(229, 9, 20, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#b3b3b3',
          font: {
            family: 'IBM Plex Mono',
          },
        },
        grid: {
          color: 'rgba(229, 9, 20, 0.1)',
        },
      },
    },
  };

  return (
    <div className="dashboard-grid">
      <Card title="Budget by Genre" badge="Analytics">
        <div className="chart-container">
          <Bar data={budgetChartData} options={budgetChartOptions} />
        </div>
      </Card>
      <Card title="Stage Distribution">
        <div className="stage-stats">
          {Object.entries(stageDistribution).map(([stage, count]) => (
            <div key={stage} className="stat-row">
              <div className="stat-label-row">
                <span className="stat-stage-name">{stage.replace('-', ' ')}</span>
                <span className="stat-stage-count">{count}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(count / projects.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
