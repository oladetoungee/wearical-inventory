"use client";
import { ReactNode } from 'react';
import FirebaseProvider from './firebase';
import ToastProvider from './toast';
import {UserProvider} from './UserProvider';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <FirebaseProvider>

        <ToastProvider>
          {children}
        </ToastProvider>

    </FirebaseProvider>
  );
}
