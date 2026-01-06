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
