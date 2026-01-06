#!/bin/bash

# AddProjectModal.jsx
cat > src/components/features/pipeline/AddProjectModal.jsx << 'EOF'
import { useState } from 'react';
import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { GENRES, PRIORITY_LEVELS, PRODUCTION_STAGES } from '@utils/constants';
import { generateId } from '@utils/helpers';
import './AddProjectModal.css';

export function AddProjectModal({ isOpen, onClose, setProjects }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Drama',
    budget: '',
    priority: 'Medium',
    stage: PRODUCTION_STAGES.PITCH,
    releaseDate: '',
    progress: 0,
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newProject = {
      id: generateId(),
      ...formData,
      budget: `$${formData.budget}M`,
    };
    setProjects(prev => [...prev, newProject]);
    onClose();
    setFormData({
      title: '',
      genre: 'Drama',
      budget: '',
      priority: 'Medium',
      stage: PRODUCTION_STAGES.PITCH,
      releaseDate: '',
      progress: 0,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Project Title
          </label>
          <input
            id="title"
            className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter project title"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="genre">
            Genre
          </label>
          <select id="genre" className="form-select" name="genre" value={formData.genre} onChange={handleChange}>
            {GENRES.map(genre => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="budget">
            Budget (in millions)
          </label>
          <input
            id="budget"
            className="form-input"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            placeholder="25"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="priority">
            Priority
          </label>
          <select id="priority" className="form-select" name="priority" value={formData.priority} onChange={handleChange}>
            {PRIORITY_LEVELS.map(level => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="releaseDate">
            Release Date
          </label>
          <input
            id="releaseDate"
            className="form-input"
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" variant="primary" style={{ width: '100%' }}>
          Create Project
        </Button>
      </form>
    </Modal>
  );
}
EOF

# AddProjectModal.css
cat > src/components/features/pipeline/AddProjectModal.css << 'EOF'
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  font-weight: 600;
}

.form-input,
.form-select,
.form-textarea {
  font-family: 'IBM Plex Mono', monospace;
  width: 100%;
  padding: 0.75rem;
  background: var(--netflix-black);
  border: 2px solid var(--netflix-light-gray);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all var(--transition-normal);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--netflix-red);
  box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}
EOF

# ScheduleView.jsx
cat > src/components/features/schedule/ScheduleView.jsx << 'EOF'
import { Card } from '@components/common/Card';
import { sortProjectsByDate, formatDate } from '@utils/helpers';
import './ScheduleView.css';

export function ScheduleView({ projects }) {
  const sortedProjects = sortProjectsByDate(projects);

  return (
    <Card title="Content Schedule" badge="2026-2027">
      <div className="schedule-grid">
        {sortedProjects.map(project => (
          <div key={project.id} className="timeline-item">
            <div className="timeline-date">{formatDate(project.releaseDate)}</div>
            <div className="timeline-title">{project.title}</div>
            <div className="timeline-details">
              <span>{project.genre}</span>
              <span>•</span>
              <span>{project.budget} Budget</span>
              <span>•</span>
              <span>{project.progress}% Complete</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
EOF

# ScheduleView.css
cat > src/components/features/schedule/ScheduleView.css << 'EOF'
.schedule-grid {
  display: grid;
  gap: 1rem;
}

.timeline-item {
  background: var(--netflix-black);
  border-left: 4px solid var(--accent-cyan);
  padding: 1.5rem;
  position: relative;
  transition: all var(--transition-normal);
}

.timeline-item:hover {
  border-left-color: var(--netflix-red);
  transform: translateX(8px);
}

.timeline-date {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.25rem;
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.timeline-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-details {
  font-size: 0.8rem;
  color: var(--text-secondary);
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
}
EOF

# LocalizationView.jsx
cat > src/components/features/localization/LocalizationView.jsx << 'EOF'
import { Card } from '@components/common/Card';
import { INITIAL_LANGUAGES } from '@utils/constants';
import './LocalizationView.css';

export function LocalizationView() {
  return (
    <Card title="Localization Status" badge="35 Languages">
      <div className="localization-grid">
        {INITIAL_LANGUAGES.map((lang, index) => (
          <div key={index} className="language-item">
            <div className="language-name">{lang.name}</div>
            <div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${lang.progress}%` }} />
              </div>
            </div>
            <div className={`status-badge ${lang.status}`}>
              {lang.status.replace('-', ' ')}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
EOF

# LocalizationView.css
cat > src/components/features/localization/LocalizationView.css << 'EOF'
.localization-grid {
  display: grid;
  gap: 1rem;
}

.language-item {
  background: var(--netflix-black);
  border: 2px solid var(--netflix-gray);
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 200px 1fr 120px;
  gap: 2rem;
  align-items: center;
  transition: all var(--transition-normal);
}

.language-item:hover {
  border-color: var(--netflix-red);
}

.language-name {
  font-weight: 600;
  font-size: 1rem;
}

.progress-bar {
  background: var(--netflix-gray);
  height: 8px;
  border: 1px solid var(--netflix-light-gray);
  position: relative;
  overflow: hidden;
}

.progress-fill {
  background: var(--accent-green);
  height: 100%;
  transition: width var(--transition-slow);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

.status-badge {
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  text-align: center;
  border: 2px solid;
}

.status-badge.completed {
  background: rgba(70, 211, 105, 0.1);
  border-color: var(--accent-green);
  color: var(--accent-green);
}

.status-badge.in-progress {
  background: rgba(255, 215, 0, 0.1);
  border-color: var(--accent-yellow);
  color: var(--accent-yellow);
}

.status-badge.pending {
  background: rgba(128, 128, 128, 0.1);
  border-color: var(--netflix-light-gray);
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .language-item {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
EOF

echo "All feature components created successfully!"
