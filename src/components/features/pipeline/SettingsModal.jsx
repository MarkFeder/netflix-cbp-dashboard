import { memo, useCallback } from 'react';
import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { clearAllStorage } from '@utils/storage';
import './SettingsModal.css';

const APP_INFO = {
  name: 'Netflix CBP Dashboard',
  version: '1.0.0',
  description: 'Content-Based Personalization Pipeline Management',
};

const CONFIRMATION_MESSAGE =
  'Are you sure you want to clear all local data? This action cannot be undone.';

/**
 * DataManagementSection - Section for managing application data
 */
function DataManagementSection({ onClearData }) {
  return (
    <section className="settings-section">
      <h3>Data Management</h3>
      <p>Manage your local application data and preferences.</p>
      <Button variant="danger" onClick={onClearData}>
        Clear All Local Data
      </Button>
    </section>
  );
}

/**
 * AboutSection - Displays application information
 */
function AboutSection() {
  return (
    <section className="settings-section">
      <h3>About</h3>
      <div className="about-info">
        <p>
          <strong>{APP_INFO.name}</strong>
        </p>
        <p>Version {APP_INFO.version}</p>
        <p>{APP_INFO.description}</p>
      </div>
    </section>
  );
}

/**
 * SettingsModal - Modal for application settings and data management
 *
 * Provides options to clear local storage and displays application info.
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Handler to close the modal
 */
export const SettingsModal = memo(function SettingsModal({ isOpen, onClose }) {
  const handleClearData = useCallback(() => {
    if (window.confirm(CONFIRMATION_MESSAGE)) {
      clearAllStorage();
      window.location.reload();
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="settings-modal">
        <DataManagementSection onClearData={handleClearData} />
        <AboutSection />
      </div>
    </Modal>
  );
});
