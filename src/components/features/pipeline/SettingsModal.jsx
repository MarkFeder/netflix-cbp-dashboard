import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { clearAllStorage } from '@utils/storage';
import './SettingsModal.css';

export function SettingsModal({ isOpen, onClose }) {
  const handleClearData = () => {
    if (
      window.confirm('Are you sure you want to clear all local data? This action cannot be undone.')
    ) {
      clearAllStorage();
      window.location.reload();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="settings-modal">
        <section className="settings-section">
          <h3>Data Management</h3>
          <p>Manage your local application data and preferences.</p>
          <Button variant="danger" onClick={handleClearData}>
            Clear All Local Data
          </Button>
        </section>

        <section className="settings-section">
          <h3>About</h3>
          <div className="about-info">
            <p>
              <strong>Netflix CBP Dashboard</strong>
            </p>
            <p>Version 1.0.0</p>
            <p>Content-Based Personalization Pipeline Management</p>
          </div>
        </section>
      </div>
    </Modal>
  );
}
