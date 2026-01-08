import { useState, useCallback, memo } from 'react';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { PipelineStage } from './PipelineStage';
import { AddProjectModal } from './AddProjectModal';
import { ReportModal } from './ReportModal';
import { SettingsModal } from './SettingsModal';
import { STAGE_NAMES } from '@utils/constants';
import './PipelineView.css';

const QUICK_ACTIONS = [
  { id: 'add', icon: '+', label: 'New Project' },
  { id: 'report', icon: '📊', label: 'Generate Report' },
  { id: 'calendar', icon: '📅', label: 'View Calendar' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

/**
 * Custom hook for managing drag and drop operations
 */
function useDragAndDrop(projects, setProjects) {
  const [draggedProject, setDraggedProject] = useState(null);

  const handleDragStart = useCallback((e, project) => {
    setDraggedProject(project);
    e.currentTarget.classList.add('dragging');
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedProject(null);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.currentTarget.classList.remove('drag-over');
  }, []);

  const handleDrop = useCallback(
    (e, targetStage) => {
      e.preventDefault();
      e.currentTarget.classList.remove('drag-over');

      if (draggedProject && draggedProject.stage !== targetStage) {
        setProjects(
          projects.map((p) => (p.id === draggedProject.id ? { ...p, stage: targetStage } : p))
        );
      }
    },
    [draggedProject, projects, setProjects]
  );

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
}

/**
 * QuickActionButton - Single action button with icon
 */
function QuickActionButton({ icon, label, onClick }) {
  return (
    <Button variant="action" onClick={onClick}>
      <span className="action-icon">{icon}</span>
      {label}
    </Button>
  );
}

/**
 * QuickActionsCard - Card containing all quick action buttons
 */
const QuickActionsCard = memo(function QuickActionsCard({ onAction }) {
  return (
    <Card title="Quick Actions">
      <div className="quick-actions">
        {QUICK_ACTIONS.map(({ id, icon, label }) => (
          <QuickActionButton key={id} icon={icon} label={label} onClick={() => onAction(id)} />
        ))}
      </div>
    </Card>
  );
});

/**
 * PipelineView - Main view for the content production pipeline
 *
 * Displays the drag-and-drop pipeline stages, quick action buttons,
 * and manages modal states for adding projects, generating reports,
 * and accessing settings.
 *
 * @param {Array} projects - All projects in the pipeline
 * @param {Function} setProjects - State setter for updating projects
 * @param {Array} stages - Pipeline stages to display
 * @param {Function} setActiveTab - Function to change active tab
 */
export const PipelineView = memo(function PipelineView({
  projects,
  setProjects,
  stages,
  setActiveTab,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const dragHandlers = useDragAndDrop(projects, setProjects);

  const handleQuickAction = useCallback(
    (actionId) => {
      const actions = {
        add: () => setShowAddModal(true),
        report: () => setShowReportModal(true),
        calendar: () => setActiveTab('schedule'),
        settings: () => setShowSettingsModal(true),
      };
      actions[actionId]?.();
    },
    [setActiveTab]
  );

  return (
    <>
      <div className="dashboard-grid">
        <Card title="Content Pipeline" badge="Live">
          <div className="pipeline">
            {stages.map((stage) => (
              <PipelineStage
                key={stage}
                stage={stage}
                stageName={STAGE_NAMES[stage]}
                projects={projects.filter((p) => p.stage === stage)}
                {...dragHandlers}
              />
            ))}
          </div>
        </Card>

        <QuickActionsCard onAction={handleQuickAction} />
      </div>

      <AddProjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        setProjects={setProjects}
      />
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        projects={projects}
      />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </>
  );
});
