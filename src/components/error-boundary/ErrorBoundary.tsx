import { Component, ErrorInfo, ReactNode, Suspense } from 'react';
import ErrorFallback from './ErrorFallback';
import SuspenseFallback from '../suspense-fallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ErrorFallback
          error={this.state.error || new Error('Unknown error occurred')}
          resetErrorBoundary={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 



export const WithErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ErrorBoundary
    fallback={
      <ErrorFallback
        error={new Error("Something went wrong. Please try again later.")}
      />
    }
  >
    <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
  </ErrorBoundary>
);