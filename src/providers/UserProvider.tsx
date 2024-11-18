// context/UserProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import useAuthUser from '../lib/hooks/useAuthUser';
import { UserContextType } from '@/lib/utils';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, userData, loading } = useAuthUser();


  return (
    <UserContext.Provider value={{ user, userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
