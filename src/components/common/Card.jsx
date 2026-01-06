import './Card.css';

export function Card({ title, badge, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header">
          <span>{title}</span>
          {badge && <span className="card-badge">{badge}</span>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
