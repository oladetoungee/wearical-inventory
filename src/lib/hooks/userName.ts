import { getDatabase, ref, get } from "firebase/database";
import { useState, useEffect } from "react";

export const useUserName = (uid: String) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!uid) return;
    
    const fetchUserName = async () => {
      const db = getDatabase();
      const userRef = ref(db, `/users/${uid}`);
      
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserName(snapshot.val().fullName || "Unknown User");
        } else {
          setUserName("Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Unknown User");
      }
    };

    fetchUserName();
  }, [uid]);

  return userName;
};
