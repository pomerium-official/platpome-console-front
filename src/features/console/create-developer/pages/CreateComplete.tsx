import React from 'react';
import styles from './CreateComplete.module.scss';
import { LineButton } from '@/features/common/components/common/Button/LineButton';
import ConsoleLayout from '@/features/common/layout/console/ConsoleLayout';
import { useRouter } from 'next/router';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';

const CreateComplete = () => {
  useUserInfo({ needLogin: true });
  const router = useRouter();
  return (
    <ConsoleLayout createDeveloper>
      <div className={`createComplete ${styles.createComplete}`}>
        <h1>Welcome to PomeriumX developers!</h1>
        <p>Let's jump right into the PomeriumX developer console!</p>
        <LineButton
          onClick={() => router.push('/console')}
          label="Go to console"
          size="xlarge"
          styleType="neutral"
        />
      </div>
    </ConsoleLayout>
  );
};

export default CreateComplete;
