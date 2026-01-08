import { createContext, useContext, useState, useEffect, useMemo, memo } from 'react';
import { INITIAL_PROJECTS, PRODUCTION_STAGES } from '@utils/constants';
import { calculateTotalBudget, getProjectsByStage } from '@utils/helpers';
import { getProjects, saveProjects, getActiveTab, saveActiveTab } from '@utils/storage';

const AppContext = createContext(null);

const DEFAULT_TAB = 'pipeline';

const TAB_NAMES = {
  pipeline: 'Pipeline',
  schedule: 'Schedule',
  localization: 'Localization',
  analytics: 'Analytics',
};

/**
 * Custom hook for persisting active tab to localStorage
 */
function useActiveTabPersistence(activeTab, setAnnouncement) {
  useEffect(() => {
    saveActiveTab(activeTab);
    const tabDisplayName = TAB_NAMES[activeTab] || activeTab;
    setAnnouncement(`Switched to ${tabDisplayName} view`);
  }, [activeTab, setAnnouncement]);
}

/**
 * Custom hook for persisting projects to localStorage
 */
function useProjectsPersistence(projects) {
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);
}

/**
 * Custom hook for computing derived values from projects
 */
function useComputedValues(projects) {
  const stages = useMemo(() => Object.values(PRODUCTION_STAGES), []);

  const totalBudget = useMemo(() => calculateTotalBudget(projects), [projects]);

  const activeProjects = useMemo(() => {
    const productionCount = getProjectsByStage(projects, PRODUCTION_STAGES.PRODUCTION).length;
    const postProductionCount = getProjectsByStage(
      projects,
      PRODUCTION_STAGES.POST_PRODUCTION
    ).length;
    return productionCount + postProductionCount;
  }, [projects]);

  return { stages, totalBudget, activeProjects };
}

/**
 * AppProvider - Global application state provider
 *
 * Manages application-wide state including:
 * - Active tab navigation
 * - Project data with localStorage persistence
 * - Screen reader announcements for accessibility
 * - Computed statistics (budget, active projects, stages)
 *
 * @param {ReactNode} children - Child components to wrap
 */
export const AppProvider = memo(function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState(() => getActiveTab(DEFAULT_TAB));
  const [projects, setProjects] = useState(() => getProjects(INITIAL_PROJECTS));
  const [announcement, setAnnouncement] = useState('');

  // Persist data to localStorage
  useActiveTabPersistence(activeTab, setAnnouncement);
  useProjectsPersistence(projects);

  // Compute derived values
  const { stages, totalBudget, activeProjects } = useComputedValues(projects);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      projects,
      setProjects,
      announcement,
      setAnnouncement,
      stages,
      totalBudget,
      activeProjects,
    }),
    [activeTab, projects, announcement, stages, totalBudget, activeProjects]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});

/**
 * useApp - Custom hook to access application context
 *
 * Must be used within an AppProvider. Throws an error if used outside
 * the provider to help catch bugs early.
 *
 * @returns {Object} Application context value
 * @throws {Error} If used outside of AppProvider
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
