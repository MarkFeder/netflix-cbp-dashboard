import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_PROJECTS, PRODUCTION_STAGES } from '@utils/constants';
import { calculateTotalBudget, getProjectsByStage } from '@utils/helpers';
import { getProjects, saveProjects, getActiveTab, saveActiveTab } from '@utils/storage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState(() => getActiveTab('pipeline'));
  const [projects, setProjects] = useState(() => getProjects(INITIAL_PROJECTS));
  const [announcement, setAnnouncement] = useState('');

  // Persist active tab to localStorage
  useEffect(() => {
    saveActiveTab(activeTab);
    const tabNames = {
      pipeline: 'Pipeline',
      schedule: 'Schedule',
      localization: 'Localization',
      analytics: 'Analytics',
    };
    setAnnouncement(`Switched to ${tabNames[activeTab]} view`);
  }, [activeTab]);

  // Persist projects to localStorage
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  // Computed values
  const stages = useMemo(() => Object.values(PRODUCTION_STAGES), []);
  const totalBudget = useMemo(() => calculateTotalBudget(projects), [projects]);
  const activeProjects = useMemo(
    () =>
      getProjectsByStage(projects, PRODUCTION_STAGES.PRODUCTION).length +
      getProjectsByStage(projects, PRODUCTION_STAGES.POST_PRODUCTION).length,
    [projects]
  );

  const value = {
    activeTab,
    setActiveTab,
    projects,
    setProjects,
    announcement,
    setAnnouncement,
    stages,
    totalBudget,
    activeProjects,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
