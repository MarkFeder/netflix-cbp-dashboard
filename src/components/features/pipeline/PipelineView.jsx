import { useState } from 'react';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { PipelineStage } from './PipelineStage';
import { AddProjectModal } from './AddProjectModal';
import { ReportModal } from './ReportModal';
import { SettingsModal } from './SettingsModal';
import { STAGE_NAMES } from '@utils/constants';
import './PipelineView.css';

export function PipelineView({ projects, setProjects, stages, setActiveTab }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [draggedProject, setDraggedProject] = useState(null);

  const handleDragStart = (e, project) => {
    setDraggedProject(project);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = e => {
    e.currentTarget.classList.remove('dragging');
    setDraggedProject(null);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDragEnter = e => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = e => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    if (draggedProject && draggedProject.stage !== targetStage) {
      setProjects(
        projects.map(p => (p.id === draggedProject.id ? { ...p, stage: targetStage } : p))
      );
    }
  };

  return (
    <>
      <div className="dashboard-grid">
        <Card title="Content Pipeline" badge="Live">
          <div className="pipeline">
            {stages.map(stage => (
              <PipelineStage
                key={stage}
                stage={stage}
                stageName={STAGE_NAMES[stage]}
                projects={projects.filter(p => p.stage === stage)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </Card>
        <Card title="Quick Actions">
          <div className="quick-actions">
            <Button variant="action" onClick={() => setShowAddModal(true)}>
              <span className="action-icon">+</span>
              New Project
            </Button>
            <Button variant="action" onClick={() => setShowReportModal(true)}>
              <span className="action-icon">📊</span>
              Generate Report
            </Button>
            <Button variant="action" onClick={() => setActiveTab('schedule')}>
              <span className="action-icon">📅</span>
              View Calendar
            </Button>
            <Button variant="action" onClick={() => setShowSettingsModal(true)}>
              <span className="action-icon">⚙️</span>
              Settings
            </Button>
          </div>
        </Card>
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
}
