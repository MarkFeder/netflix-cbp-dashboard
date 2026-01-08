import { useMemo, memo } from 'react';
import { Card } from '@components/common/Card';
import { INITIAL_LANGUAGES } from '@utils/constants';
import './LocalizationView.css';

/**
 * Formats a status string for display (e.g., "in-progress" -> "in progress")
 */
function formatStatus(status) {
  return status.replace('-', ' ');
}

/**
 * LanguageProgressBar - Displays localization progress for a single language
 */
function LanguageProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}

/**
 * StatusBadge - Displays the current status of a localization task
 */
function StatusBadge({ status }) {
  const displayStatus = formatStatus(status);
  const statusClass = `status-badge ${status}`;

  return <div className={statusClass}>{displayStatus}</div>;
}

/**
 * LanguageItem - Displays localization information for a single language
 */
const LanguageItem = memo(function LanguageItem({ language }) {
  const { name, progress, status } = language;

  return (
    <div className="language-item">
      <div className="language-name">{name}</div>
      <LanguageProgressBar progress={progress} />
      <StatusBadge status={status} />
    </div>
  );
});

/**
 * LocalizationView - Displays localization status across all supported languages
 *
 * Shows a grid of languages with their translation progress and current status.
 * Status can be: "completed", "in-progress", or "pending"
 */
export const LocalizationView = memo(function LocalizationView() {
  const languageCount = useMemo(() => INITIAL_LANGUAGES.length, []);
  const badgeText = `${languageCount} Languages`;

  return (
    <Card title="Localization Status" badge={badgeText}>
      <div className="localization-grid">
        {INITIAL_LANGUAGES.map((language) => (
          <LanguageItem key={language.name} language={language} />
        ))}
      </div>
    </Card>
  );
});
