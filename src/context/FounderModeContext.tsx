'use client';

import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';

type FounderModeContextValue = {
  founderMode: boolean;
  setFounderMode: (value: boolean) => void;
  toggleFounderMode: () => void;
};

const FounderModeContext = createContext<FounderModeContextValue | null>(null);
const FOUNDER_MODE_EVENT = 'pb-founder-mode-updated';
const FOUNDER_MODE_FALLBACK = 'false';

export function FounderModeProvider({ children }: { children: ReactNode }) {
  const founderModeSnapshot = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      window.addEventListener(FOUNDER_MODE_EVENT, onStoreChange);

      return () => {
        window.removeEventListener('storage', onStoreChange);
        window.removeEventListener(FOUNDER_MODE_EVENT, onStoreChange);
      };
    },
    () => window.localStorage.getItem('pb_founder_mode') ?? FOUNDER_MODE_FALLBACK,
    () => FOUNDER_MODE_FALLBACK
  );

  const founderMode = founderModeSnapshot === 'true';

  const setFounderMode = (value: boolean) => {
    window.localStorage.setItem('pb_founder_mode', String(value));
    window.dispatchEvent(new Event(FOUNDER_MODE_EVENT));
  };

  return (
    <FounderModeContext.Provider
      value={{
        founderMode,
        setFounderMode,
        toggleFounderMode: () => setFounderMode(!founderMode),
      }}
    >
      {children}
    </FounderModeContext.Provider>
  );
}

export function useFounderMode() {
  const context = useContext(FounderModeContext);

  if (!context) {
    throw new Error('useFounderMode must be used within FounderModeProvider');
  }

  return context;
}
