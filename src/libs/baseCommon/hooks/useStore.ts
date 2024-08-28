import { RootStoreContext } from '../providers/RootStoreProivder';
import { useContext } from 'react';

/**
 * mobx store hooks.
 */
export function useStore() {
  const context = useContext(RootStoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within RootStoreProvider');
  }

  return context;
}
