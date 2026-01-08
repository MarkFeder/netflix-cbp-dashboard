import { memo, useCallback } from 'react';
import { TABS } from '@utils/constants';
import './Navigation.css';

/**
 * NavTab - Single navigation tab button
 */
const NavTab = memo(function NavTab({ tab, isActive, onClick }) {
  const tabClass = `nav-tab ${isActive ? 'active' : ''}`;

  return (
    <button
      className={tabClass}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {tab.label}
    </button>
  );
});

/**
 * Navigation - Main navigation tabs component
 *
 * Displays horizontal tab navigation for switching between different
 * views (Pipeline, Schedule, Localization, Analytics).
 *
 * @param {string} activeTab - Currently active tab ID
 * @param {Function} setActiveTab - Function to change the active tab
 */
export const Navigation = memo(function Navigation({ activeTab, setActiveTab }) {
  const handleTabClick = useCallback(
    (tabId) => {
      setActiveTab(tabId);
    },
    [setActiveTab]
  );

  return (
    <nav className="nav-tabs" role="navigation" aria-label="Main navigation">
      {TABS.map((tab) => (
        <NavTab
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        />
      ))}
    </nav>
  );
});
