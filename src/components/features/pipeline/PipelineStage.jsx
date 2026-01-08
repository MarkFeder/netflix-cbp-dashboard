import { memo } from 'react';
import { ProjectCard } from './ProjectCard';
import './PipelineStage.css';

/**
 * StageHeader - Displays the stage name and project count
 */
function StageHeader({ stageName, projectCount }) {
  return (
    <div className="stage-header">
      <span>{stageName}</span>
      <span className="stage-count">{projectCount}</span>
    </div>
  );
}

/**
 * PipelineStage - Represents a single stage in the production pipeline
 *
 * A drop zone that displays projects and handles drag-and-drop operations
 * for moving projects between stages.
 *
 * @param {string} stage - Stage identifier (e.g., "pitch", "greenlight")
 * @param {string} stageName - Display name for the stage
 * @param {Array} projects - Projects currently in this stage
 * @param {Function} onDragStart - Handler for drag start event
 * @param {Function} onDragEnd - Handler for drag end event
 * @param {Function} onDragOver - Handler for drag over event
 * @param {Function} onDragEnter - Handler for drag enter event
 * @param {Function} onDragLeave - Handler for drag leave event
 * @param {Function} onDrop - Handler for drop event
 */
export const PipelineStage = memo(function PipelineStage({
  stage,
  stageName,
  projects,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
}) {
  const handleDrop = (e) => {
    onDrop(e, stage);
  };

  return (
    <div
      className="stage"
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
    >
      <StageHeader stageName={stageName} projectCount={projects.length} />
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
});
