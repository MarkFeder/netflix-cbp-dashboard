import { useState } from 'react';
import { Header } from '@components/layout/Header';
import { Navigation } from '@components/layout/Navigation';
import { PipelineView } from '@components/features/pipeline/PipelineView';
import { ScheduleView } from '@components/features/schedule/ScheduleView';
import { LocalizationView } from '@components/features/localization/LocalizationView';
import { AnalyticsView } from '@components/features/analytics/AnalyticsView';
import { INITIAL_PROJECTS, PRODUCTION_STAGES } from '@utils/constants';
import { calculateTotalBudget, getProjectsByStage } from '@utils/helpers';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const stages = Object.values(PRODUCTION_STAGES);
  const totalBudget = calculateTotalBudget(projects);
  const activeProjects = getProjectsByStage(projects, PRODUCTION_STAGES.PRODUCTION).length +
    getProjectsByStage(projects, PRODUCTION_STAGES.POST_PRODUCTION).length;

  return (
    <>
      <Header
        totalProjects={projects.length}
        totalBudget={totalBudget}
        activeProjects={activeProjects}
      />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container">
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
      </div>
    </>
  );
}

export default App;
