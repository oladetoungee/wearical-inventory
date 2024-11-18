
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../utils/firebase';
import { UserData } from '@/lib/utils';

const useAuthUser = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);

      if (authUser) {
        const userRef = ref(db, `users/${authUser.uid}`);
        const unsubscribeUser = onValue(userRef, (snapshot) => {
          setUserData(snapshot.val());
          setLoading(false);
        });
        return () => unsubscribeUser();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return { user, userData, loading };
};

export default useAuthUser;
