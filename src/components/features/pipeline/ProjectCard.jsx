import { memo } from 'react';
import './ProjectCard.css';

/**
 * MetaTag - Displays a single metadata tag
 */
function MetaTag({ type, value }) {
  return <span className={`meta-tag ${type}`}>{value}</span>;
}

/**
 * ProjectCard - Draggable card displaying project information
 *
 * Shows project title and metadata (genre, budget, priority).
 * Can be dragged between pipeline stages.
 *
 * @param {Object} project - Project data object
 * @param {Function} onDragStart - Handler called when drag starts
 * @param {Function} onDragEnd - Handler called when drag ends
 */
export const ProjectCard = memo(function ProjectCard({ project, onDragStart, onDragEnd }) {
  const { title, genre, budget, priority } = project;

  const handleDragStart = (e) => {
    onDragStart(e, project);
  };

  return (
    <div
      className="project-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="project-title">{title}</div>
      <div className="project-meta">
        <MetaTag type="genre" value={genre} />
        <MetaTag type="budget" value={budget} />
        <MetaTag type="priority" value={priority} />
      </div>
    </div>
  );
});
