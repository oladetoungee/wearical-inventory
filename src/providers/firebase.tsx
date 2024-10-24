"use client"; 

import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '@/lib/utils';

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {children}
    </FirebaseAppProvider>
  );
}
