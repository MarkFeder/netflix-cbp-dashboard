import { Component } from 'react';
import './ErrorBoundary.css';

const ERROR_MESSAGES = {
  title: 'Oops! Something went wrong',
  description: "We're sorry for the inconvenience. The application encountered an unexpected error.",
  detailsTitle: 'Error Details (Development Only)',
  tryAgainButton: 'Try Again',
  reloadButton: 'Reload Page',
};

/**
 * ErrorDetails - Shows technical error information in development mode
 */
function ErrorDetails({ error, errorInfo }) {
  if (!import.meta.env.DEV || !error) {
    return null;
  }

  const errorStack = error.toString();
  const componentStack = errorInfo?.componentStack || '';

  return (
    <details className="error-boundary__details">
      <summary>{ERROR_MESSAGES.detailsTitle}</summary>
      <pre className="error-boundary__error">
        {errorStack}
        {componentStack}
      </pre>
    </details>
  );
}

/**
 * ErrorActions - Recovery action buttons
 */
function ErrorActions({ onReset }) {
  const handleReload = () => window.location.reload();

  return (
    <div className="error-boundary__actions">
      <button onClick={onReset} className="error-boundary__button">
        {ERROR_MESSAGES.tryAgainButton}
      </button>
      <button onClick={handleReload} className="error-boundary__button error-boundary__button--secondary">
        {ERROR_MESSAGES.reloadButton}
      </button>
    </div>
  );
}

/**
 * ErrorFallback - UI displayed when an error is caught
 */
function ErrorFallback({ error, errorInfo, onReset }) {
  return (
    <div className="error-boundary">
      <div className="error-boundary__container">
        <div className="error-boundary__icon">⚠️</div>
        <h1 className="error-boundary__title">{ERROR_MESSAGES.title}</h1>
        <p className="error-boundary__message">{ERROR_MESSAGES.description}</p>

        <ErrorDetails error={error} errorInfo={errorInfo} />
        <ErrorActions onReset={onReset} />
      </div>
    </div>
  );
}

/**
 * Logs error to console and external error tracking service
 */
function logError(error, errorInfo) {
  console.error('Error caught by ErrorBoundary:', error, errorInfo);

  // Send to error reporting service in production (e.g., Sentry, LogRocket)
  if (import.meta.env.PROD) {
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }
}

/**
 * ErrorBoundary - Catches React errors and displays a fallback UI
 *
 * Wraps child components to prevent the entire app from crashing when
 * a component throws an error. Shows user-friendly error message with
 * recovery options.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorFallback error={error} errorInfo={errorInfo} onReset={this.resetErrorBoundary} />;
    }

    return children;
  }
}

export { ErrorBoundary };
