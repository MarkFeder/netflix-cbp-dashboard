import './ProjectCard.css';

export function ProjectCard({ project, onDragStart, onDragEnd }) {
  return (
    <div
      className="project-card"
      draggable="true"
      onDragStart={e => onDragStart(e, project)}
      onDragEnd={onDragEnd}
    >
      <div className="project-title">{project.title}</div>
      <div className="project-meta">
        <span className="meta-tag genre">{project.genre}</span>
        <span className="meta-tag budget">{project.budget}</span>
        <span className="meta-tag priority">{project.priority}</span>
      </div>
    </div>
  );
}
