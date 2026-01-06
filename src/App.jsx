import { useState, useEffect, useMemo } from 'react';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { SkipLink } from '@components/common/SkipLink';
import { LiveRegion } from '@components/common/LiveRegion';
import { Header } from '@components/layout/Header';
import { Navigation } from '@components/layout/Navigation';
import { PipelineView } from '@components/features/pipeline/PipelineView';
import { ScheduleView } from '@components/features/schedule/ScheduleView';
import { LocalizationView } from '@components/features/localization/LocalizationView';
import { AnalyticsView } from '@components/features/analytics/AnalyticsView';
import { INITIAL_PROJECTS, PRODUCTION_STAGES } from '@utils/constants';
import { calculateTotalBudget, getProjectsByStage } from '@utils/helpers';
import { getProjects, saveProjects, getActiveTab, saveActiveTab } from '@utils/storage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState(() => getActiveTab('pipeline'));
  const [projects, setProjects] = useState(() => getProjects(INITIAL_PROJECTS));
  const [announcement, setAnnouncement] = useState('');

  // Persist active tab to localStorage and announce tab change
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

  const stages = useMemo(() => Object.values(PRODUCTION_STAGES), []);
  const totalBudget = useMemo(() => calculateTotalBudget(projects), [projects]);
  const activeProjects = useMemo(
    () =>
      getProjectsByStage(projects, PRODUCTION_STAGES.PRODUCTION).length +
      getProjectsByStage(projects, PRODUCTION_STAGES.POST_PRODUCTION).length,
    [projects]
  );

  return (
    <ErrorBoundary>
      <SkipLink />
      <LiveRegion message={announcement} />
      <Header
        totalProjects={projects.length}
        totalBudget={totalBudget}
        activeProjects={activeProjects}
      />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main id="main-content" className="container" tabIndex="-1">
        <ErrorBoundary>
          {activeTab === 'pipeline' && (
            <PipelineView
              projects={projects}
              setProjects={setProjects}
              stages={stages}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 'schedule' && <ScheduleView projects={projects} />}
          {activeTab === 'localization' && <LocalizationView />}
          {activeTab === 'analytics' && <AnalyticsView projects={projects} />}
        </ErrorBoundary>
      </main>
    </ErrorBoundary>
  );
}

export default App;
