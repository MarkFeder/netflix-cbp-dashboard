import { useState, useEffect, useMemo } from 'react';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
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

  // Persist active tab to localStorage
  useEffect(() => {
    saveActiveTab(activeTab);
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
      <Header
        totalProjects={projects.length}
        totalBudget={totalBudget}
        activeProjects={activeProjects}
      />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container">
        <ErrorBoundary>
          {activeTab === 'pipeline' && (
            <PipelineView
              projects={projects}
              setProjects={setProjects}
              stages={stages}
            />
          )}
          {activeTab === 'schedule' && <ScheduleView projects={projects} />}
          {activeTab === 'localization' && <LocalizationView />}
          {activeTab === 'analytics' && <AnalyticsView projects={projects} />}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default App;
