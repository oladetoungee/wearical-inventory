import { useState, useEffect, useCallback } from 'react';
import { db } from '../utils/firebase';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { UserData } from '../utils/definition';

interface UseUsersResult {
  users: UserData[];
  loading: boolean;
  error: Error | null;
}

export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = useCallback(() => {
    const usersRef = ref(db, 'users');
    
  
    const unsubscribe = onValue(
      usersRef,
      (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const usersList = Object.values(snapshot.val()) as UserData[];
          setUsers(usersList);
        } else {
          setUsers([]);
          console.warn('No users found');
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
        setLoading(false);
      }
    );


    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = fetchUsers();

 
    return () => unsubscribe();
  }, [fetchUsers]);

  return { users, loading, error };
};
