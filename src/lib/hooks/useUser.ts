import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../utils/firebase';

interface UserData {
  uid: string;
  email: string;
  name?: string;
  // Add any additional fields here
}

export function useUser() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        fetchUserData(currentUser.uid);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = (uid: string) => {
    setLoading(true);
    const userRef = ref(db, `users/${uid}`);
    console.log('Fetching data for user:', uid);

    onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          console.log('Snapshot data:', snapshot.val());
          setUserData({ uid, ...snapshot.val() } as UserData);
        } else {
          console.error('No such user data found in Realtime Database');
          setUserData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Failed to fetch user data:', error);
        setUserData(null);
        setLoading(false);
      }
    );
  };



  return { user, userData, loading };
}
