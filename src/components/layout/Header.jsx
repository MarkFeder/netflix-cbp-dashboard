import { memo } from 'react';
import './Header.css';

const BRAND_NAME = 'NETFLIX / CBP';

/**
 * Logo - Displays the application brand name
 */
function Logo() {
  return <div className="logo">{BRAND_NAME}</div>;
}

/**
 * StatItem - Displays a single statistic with label and value
 */
function StatItem({ label, value }) {
  return (
    <div className="stat-item">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

/**
 * HeaderStats - Container for displaying header statistics
 */
function HeaderStats({ totalProjects, totalBudget, activeProjects }) {
  return (
    <div className="header-stats">
      <StatItem label="Total Projects" value={totalProjects} />
      <StatItem label="Total Budget" value={`$${totalBudget}M`} />
      <StatItem label="Active" value={activeProjects} />
    </div>
  );
}

/**
 * Header - Application header with branding and key statistics
 *
 * Displays the Netflix CBP brand and high-level metrics about
 * projects and budget.
 *
 * @param {number} totalProjects - Total number of projects
 * @param {number} totalBudget - Total budget across all projects (in millions)
 * @param {number} activeProjects - Number of active projects
 */
export const Header = memo(function Header({ totalProjects, totalBudget, activeProjects }) {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />
        <HeaderStats
          totalProjects={totalProjects}
          totalBudget={totalBudget}
          activeProjects={activeProjects}
        />
      </div>
    </header>
  );
});
