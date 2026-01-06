import { TABS } from '@utils/constants';
import './Navigation.css';

export function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="nav-tabs" role="navigation" aria-label="Main navigation">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
