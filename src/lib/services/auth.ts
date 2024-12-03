
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { setCookie, destroyCookie } from 'nookies'; 
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
      createdAt: new Date().toISOString(),
      role: "Admin",
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

// Function to update user password
export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
  try {
    // Get the current user
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No user is currently signed in.');
    }

    // Ensure the email and password are correctly passed
    if (!user.email) {
      throw new Error('User email is not available.');
    }

    // Create the credential with the current password
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    // Reauthenticate the user
    await reauthenticateWithCredential(user, credential);

    // Once reauthenticated, update the password
    await updatePassword(user, newPassword);

    console.log('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    throw error; // Propagate the error
  }
};
