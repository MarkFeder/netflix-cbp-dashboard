import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { exportProjectsAsCSV, exportProjectsAsJSON } from '@utils/export';
import './ReportModal.css';

export function ReportModal({ isOpen, onClose, projects }) {
  const handleExportCSV = () => {
    exportProjectsAsCSV(projects);
  };

  const handleExportJSON = () => {
    exportProjectsAsJSON(projects);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Report">
      <div className="report-modal">
        <p className="report-description">
          Export your project data in various formats for reporting and analysis.
        </p>

        <div className="report-stats">
          <div className="stat-item">
            <span className="stat-label">Total Projects:</span>
            <span className="stat-value">{projects.length}</span>
          </div>
        </div>

        <div className="export-options">
          <h3>Export Formats</h3>
          <div className="export-buttons">
            <Button variant="action" onClick={handleExportCSV}>
              <span className="action-icon">📊</span>
              Export as CSV
            </Button>
            <Button variant="action" onClick={handleExportJSON}>
              <span className="action-icon">📄</span>
              Export as JSON
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
