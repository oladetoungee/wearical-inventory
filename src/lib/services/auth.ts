import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setCookie, destroyCookie } from 'nookies'; // Import cookie functions
import { redirect } from 'next/navigation'

// Function to sign up a user
export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Set the token in a cookie after successful sign-up
  const token = await user.getIdToken(); // Get the Firebase ID token
  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });
  redirect('/')
  return user; // Return user information if needed
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
redirect('/')
  return user; // Return user information if needed
};

// Function to log out a user
export const logOut = async () => {
  await signOut(auth); // Sign out from Firebase
  //REDIRECT TO SIGN IN
  redirect('/sign-in')
  destroyCookie(null, 'token'); // Remove the token cookie
};
