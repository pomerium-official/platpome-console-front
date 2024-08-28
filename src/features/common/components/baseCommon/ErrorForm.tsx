import React, { FC } from 'react';
import styles from './ErrorForm.module.css';

export interface ErrorFormProp {
  errorCode: number;
  errorMessage: string;
}

const ErrorForm: FC<ErrorFormProp> = ({ errorCode, errorMessage }) => {
  return (
    <div className={styles.errorForm}>
      <div className={styles.codeDiv}>
        <div>
          <h1>{errorCode}</h1>
          <div className={styles.messageDiv}>
            <h2>{errorMessage}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorForm;
