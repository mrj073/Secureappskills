'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuraStore } from './store';

type AuraStoreType = ReturnType<typeof useAuraStore>;

const AuraContext = createContext<AuraStoreType | null>(null);

export function AuraProvider({ children }: { children: ReactNode }) {
  const store = useAuraStore();
  return (
    <AuraContext.Provider value={store}>
      {children}
    </AuraContext.Provider>
  );
}

export function useAura() {
  const context = useContext(AuraContext);
  if (!context) {
    throw new Error('useAura must be used within an AuraProvider');
  }
  return context;
}
