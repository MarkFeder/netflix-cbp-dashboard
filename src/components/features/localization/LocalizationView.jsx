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
