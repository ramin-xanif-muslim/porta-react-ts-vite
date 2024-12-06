import React from 'react';
import { Result, Button } from 'antd';
import { t } from 'i18next';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Result
      status="error"
      title={t('Something went wrong')}
      subTitle={error.message}
      extra={
        resetErrorBoundary && (
          <Button type="primary" onClick={resetErrorBoundary}>
            {t('Try again')}
          </Button>
        )
      }
    />
  );
};

export default ErrorFallback; 