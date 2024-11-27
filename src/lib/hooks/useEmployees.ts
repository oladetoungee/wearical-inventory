import { useState, useEffect, useCallback } from 'react';
import { db } from '../utils/firebase';
import { ref, get, query, DataSnapshot } from 'firebase/database';
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

  const fetchUsers = useCallback(async () => {
    try {
      const usersRef = query(ref(db, 'users'));
      const snapshot: DataSnapshot = await get(usersRef);

      if (snapshot.exists()) {
        const usersList = Object.values(snapshot.val()) as UserData[];
        setUsers(usersList);
      } else {
        setUsers([]);
        console.warn('No users found');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error };
};
