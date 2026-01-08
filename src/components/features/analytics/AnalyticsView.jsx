import { useMemo, memo } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Chart styling constants
const CHART_COLORS = {
  primary: '#E50914', // Netflix red
  accent: '#FFD700', // Gold
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  gridLine: 'rgba(229, 9, 20, 0.1)',
};

const CHART_FONT = {
  family: 'IBM Plex Mono',
  size: 12,
};

// Static chart configuration (doesn't depend on data)
const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: CHART_COLORS.text,
        font: CHART_FONT,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: CHART_COLORS.textSecondary,
        font: { family: CHART_FONT.family },
      },
      grid: {
        color: CHART_COLORS.gridLine,
      },
    },
    x: {
      ticks: {
        color: CHART_COLORS.textSecondary,
        font: { family: CHART_FONT.family },
      },
      grid: {
        color: CHART_COLORS.gridLine,
      },
    },
  },
};

/**
 * StageProgressBar - Displays a single stage's project count and progress
 */
function StageProgressBar({ stageName, projectCount, totalProjects }) {
  const percentage = (projectCount / totalProjects) * 100;
  const displayName = stageName.replace('-', ' ');

  return (
    <div className="stat-row">
      <div className="stat-label-row">
        <span className="stat-stage-name">{displayName}</span>
        <span className="stat-stage-count">{projectCount}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

/**
 * AnalyticsView - Displays project analytics with charts and statistics
 * Shows:
 * 1. Budget allocation by genre (bar chart)
 * 2. Distribution of projects across production stages (progress bars)
 */
export const AnalyticsView = memo(function AnalyticsView({ projects }) {
  // Calculate analytics data from projects
  const budgetByGenre = useMemo(() => calculateBudgetByGenre(projects), [projects]);
  const stageDistribution = useMemo(() => calculateStageDistribution(projects), [projects]);

  // Prepare chart data for Chart.js
  const budgetChartData = useMemo(() => {
    const genres = Object.keys(budgetByGenre);
    const budgets = Object.values(budgetByGenre);

    return {
      labels: genres,
      datasets: [
        {
          label: 'Budget ($M)',
          data: budgets,
          backgroundColor: CHART_COLORS.primary,
          borderColor: CHART_COLORS.accent,
          borderWidth: 2,
        },
      ],
    };
  }, [budgetByGenre]);

  return (
    <div className="dashboard-grid">
      {/* Budget Chart */}
      <Card title="Budget by Genre" badge="Analytics">
        <div className="chart-container">
          <Bar data={budgetChartData} options={CHART_OPTIONS} />
        </div>
      </Card>

      {/* Stage Distribution */}
      <Card title="Stage Distribution">
        <div className="stage-stats">
          {Object.entries(stageDistribution).map(([stage, count]) => (
            <StageProgressBar
              key={stage}
              stageName={stage}
              projectCount={count}
              totalProjects={projects.length}
            />
          ))}
        </div>
      </Card>
    </div>
  );
});
