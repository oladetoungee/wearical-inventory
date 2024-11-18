
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setCookie, destroyCookie } from 'nookies'; // Import cookie functions
import { ref, set } from 'firebase/database';
import { auth, db } from '../utils/firebase';
// Function to sign up a user
export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set the token in a cookie
    const token = await user.getIdToken();
    setCookie(null, "token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });

    // Save user details to Realtime Database
    await set(ref(db, `users/${user.uid}`), {
      email: user.email,
      uid: user.uid,
      fullName: fullName,
    });

    return user;
  } catch (error) {
    console.error("Error in signUp function:", error);
    throw error;
  }
};

// Function to sign in a user
export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Set the token in a cookie after successful sign-in
  const token = await user.getIdToken(); // Get the Firebase ID token
  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });
  return user; // Return user information if needed
};

// Function to log out a user
export const logOut = async () => {
  await signOut(auth); // Sign out from Firebase
  destroyCookie(null, 'token'); // Remove the token cookie
};
