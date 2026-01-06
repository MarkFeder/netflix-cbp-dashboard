import './Header.css';

export function Header({ totalProjects, totalBudget, activeProjects }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">NETFLIX / CBP</div>
        <div className="header-stats">
          <div className="stat-item">
            <div className="stat-label">Total Projects</div>
            <div className="stat-value">{totalProjects}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Total Budget</div>
            <div className="stat-value">${totalBudget}M</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Active</div>
            <div className="stat-value">{activeProjects}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
