
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setCookie, destroyCookie } from 'nookies'; 
import { ref, set } from 'firebase/database';
import { randomBytes } from 'crypto'; 
import { auth, db } from '../utils/firebase';
import axios from "axios";



export const addEmployee = async (email: string, fullName: string, phone: string, role: string) => {
  try {
    // Save the current user's email and token
    const currentUser = auth.currentUser;
    const currentToken = await currentUser?.getIdToken();

    if (!currentUser || !currentToken) {
      throw new Error('No authenticated user to perform this action');
    }

    const password = randomBytes(8).toString('hex');

    // Create the employee account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save employee details to the Realtime Database
    await set(ref(db, `users/${user.uid}`), {
      email: user.email,
      fullName: fullName,
      phone: phone,
      role: role,
      createdBy: currentUser.uid,
      createdAt: new Date().toISOString(),
    });

    // Send email to the new employee
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    await axios.post(`${baseUrl}/api/newMember`, {
      to: email,
      fullName,
      password,
    });

    console.log(`Employee account created. Email: ${email}, Password: ${password}`);


    return { email, password };
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};


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
