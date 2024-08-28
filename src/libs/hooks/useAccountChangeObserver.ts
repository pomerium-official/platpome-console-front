import { useEffect, useState } from 'react';

export const useAccountCahngeObserver = () => {
  const [accountChangeObserver, setAccountChangeObserver] = useState();
  const accountsChanged = () => {
    window.ethereum.on('accountsChanged', (e: any) => {
      setAccountChangeObserver(e[0]);
    });
  };
  useEffect(() => {
    accountsChanged();
  }, []);
  return accountChangeObserver;
};
