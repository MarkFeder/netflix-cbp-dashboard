import { memo, useCallback } from 'react';
import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { exportProjectsAsCSV, exportProjectsAsJSON } from '@utils/export';
import './ReportModal.css';

const EXPORT_FORMATS = [
  { type: 'csv', icon: '📊', label: 'Export as CSV', handler: exportProjectsAsCSV },
  { type: 'json', icon: '📄', label: 'Export as JSON', handler: exportProjectsAsJSON },
];

/**
 * StatItem - Displays a single statistic
 */
function StatItem({ label, value }) {
  return (
    <div className="stat-item">
      <span className="stat-label">{label}:</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

/**
 * ExportButton - Button for exporting data in a specific format
 */
function ExportButton({ icon, label, onClick }) {
  return (
    <Button variant="action" onClick={onClick}>
      <span className="action-icon">{icon}</span>
      {label}
    </Button>
  );
}

/**
 * ReportModal - Modal for generating and exporting project reports
 *
 * Displays project statistics and provides options to export data
 * in various formats (CSV, JSON).
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Handler to close the modal
 * @param {Array} projects - Array of project objects to export
 */
export const ReportModal = memo(function ReportModal({ isOpen, onClose, projects }) {
  const createExportHandler = useCallback((exportFunction) => {
    return () => exportFunction(projects);
  }, [projects]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Report">
      <div className="report-modal">
        <p className="report-description">
          Export your project data in various formats for reporting and analysis.
        </p>

        <div className="report-stats">
          <StatItem label="Total Projects" value={projects.length} />
        </div>

        <div className="export-options">
          <h3>Export Formats</h3>
          <div className="export-buttons">
            {EXPORT_FORMATS.map(({ type, icon, label, handler }) => (
              <ExportButton
                key={type}
                icon={icon}
                label={label}
                onClick={createExportHandler(handler)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
});
