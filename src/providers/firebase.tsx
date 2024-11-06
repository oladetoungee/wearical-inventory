

"use client";
import React, { ReactNode, createContext, useContext } from 'react';
import { app } from '@/lib/utils/firebase';

const FirebaseContext = createContext(app);

export default function FirebaseProvider({ children }: { children: ReactNode }) {
  return <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>;
}

export const useFirebaseApp = () => useContext(FirebaseContext);

