import { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';
import { auth, db } from '../utils/firebase';
import {  UserData } from '../utils/definition';


export function useUser() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await fetchUserData(currentUser.uid);
      } else {
        clearUserData();
      }

      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchUserData = useCallback(async (uid: string) => {
    setLoading(true);

    const userRef = ref(db, `users/${uid}`);
    const handleSnapshot = (snapshot: any) => {
      if (snapshot.exists()) {
        setUserData({ uid, ...snapshot.val() } as UserData);
      } else {
        console.warn(`No user data found for uid: ${uid}`);
        setUserData(null);
      }
      setLoading(false);
    };

    const handleError = (error: Error) => {
      console.error(`Error fetching user data: ${error.message}`);
      setUserData(null);
      setLoading(false);
    };

    try {
      onValue(userRef, handleSnapshot, handleError);

      return () => off(userRef); 
    } catch (error) {
      console.error(`Unexpected error fetching user data: ${error}`);
      setLoading(false);
    }
  }, []);

  const clearUserData = useCallback(() => {
    setUserData(null);
  }, []);

  return { user, userData, loading };
}
