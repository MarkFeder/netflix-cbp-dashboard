#!/bin/bash

# PipelineView.css
cat > src/components/features/pipeline/PipelineView.css << 'EOF'
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.pipeline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.action-icon {
  font-size: 2rem;
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .pipeline {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .pipeline {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
}
EOF

# PipelineStage.jsx
cat > src/components/features/pipeline/PipelineStage.jsx << 'EOF'
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
EOF

# PipelineStage.css
cat > src/components/features/pipeline/PipelineStage.css << 'EOF'
.stage {
  background: var(--netflix-black);
  border: 2px solid var(--netflix-gray);
  padding: 1rem;
  min-height: 400px;
  transition: all var(--transition-normal);
}

.stage:hover {
  border-color: var(--netflix-red);
}

.stage.drag-over {
  border-color: var(--accent-cyan);
  background: rgba(0, 217, 255, 0.05);
}

.stage-header {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 1.5px;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--netflix-red);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stage-count {
  font-size: 1.25rem;
  color: var(--accent-cyan);
}
EOF

# Project Card
cat > src/components/features/pipeline/ProjectCard.jsx << 'EOF'
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
EOF

# ProjectCard.css
cat > src/components/features/pipeline/ProjectCard.css << 'EOF'
.project-card {
  background: var(--netflix-gray);
  border: 1px solid var(--netflix-light-gray);
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: grab;
  transition: all var(--transition-fast);
  position: relative;
}

.project-card:hover {
  border-color: var(--accent-cyan);
  transform: translateX(4px);
}

.project-card:active {
  cursor: grabbing;
}

.project-card.dragging {
  opacity: 0.5;
  transform: rotate(2deg);
}

.project-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.7rem;
  margin-top: 0.75rem;
}

.meta-tag {
  background: var(--netflix-black);
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid var(--netflix-light-gray);
}

.meta-tag.genre {
  border-color: var(--accent-yellow);
  color: var(--accent-yellow);
}

.meta-tag.budget {
  border-color: var(--accent-green);
  color: var(--accent-green);
}

.meta-tag.priority {
  border-color: var(--netflix-red);
  color: var(--netflix-red);
}
EOF

echo "Pipeline components created successfully!"
