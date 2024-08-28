import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { confirmConsole } from '@/libs/hooks/dialogConsole';

export const onExitConfirmContent: {
  title: string;
  content: React.ReactNode;
  option: {};
} = {
  title: 'Caution',
  content: (
    <>
      Are you sure you want to leave?
      <br />
      Change may not be saved.
    </>
  ),
  option: {
    icon: 'caution',
  },
};

export const useBackObserver = (backUrl?: string, condition?: boolean) => {
  const router = useRouter();

  const backObserver = async () => {
    history.pushState(null, '', location.href);
    const warn = await confirmConsole(
      onExitConfirmContent.title,
      onExitConfirmContent.content,
      onExitConfirmContent.option
    );
    if (warn === 'ok') {
      if (backUrl) {
        await router.replace(`${backUrl}`);
      }
    }
  };

  const refreshObserver = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (condition) {
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', backObserver);
      window.addEventListener('beforeunload', refreshObserver);
    }
    return () => {
      window.removeEventListener('popstate', backObserver);
      window.removeEventListener('beforeunload', refreshObserver);
    };
  }, [router, router.isReady, condition]);
};
