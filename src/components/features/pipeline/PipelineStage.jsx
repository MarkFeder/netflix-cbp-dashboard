import { ProjectCard } from './ProjectCard';
import './PipelineStage.css';

export function PipelineStage({
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
  return (
    <div
      className="stage"
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={e => onDrop(e, stage)}
    >
      <div className="stage-header">
        <span>{stageName}</span>
        <span className="stage-count">{projects.length}</span>
      </div>
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
}
