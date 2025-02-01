
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, updatePassword, reauthenticateWithCredential,
   EmailAuthProvider,   
   reauthenticateWithPopup, 
   GoogleAuthProvider, 
   } from 'firebase/auth';
import { setCookie, destroyCookie } from 'nookies'; 
import { ref, set } from 'firebase/database';
import { auth, db } from '../utils/firebase';


// Function to sign up a user
export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();
    setCookie(null, "token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });

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

  const token = await user.getIdToken(); 
  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60, 
    path: '/',
  });
  return user; 
};

// Function to log out a user
export const logOut = async () => {
  await signOut(auth);
  destroyCookie(null, 'token'); 
  
};

// Function to update user password
export const updateUserPassword = async (currentPassword: any, newPassword: any) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No user is currently signed in.');
    }

    const providerData = user.providerData[0];
    const providerId = providerData.providerId;

    let credential;

    if (providerId === 'password') {
      if (!user.email) {
        throw new Error('User email is not available.');
      }
      credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
    } else if (providerId === 'google.com') {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, provider);
    } else {
      throw new Error(`Unsupported provider: ${providerId}`);
    }

    // Update the password
    await updatePassword(user, newPassword);
    console.log('Password updated successfully');
  } catch (error: any) {
    console.error('Error updating password:', error.code, error.message);
    if (error.code === 'auth/invalid-credential') {
      console.log('The current password is incorrect. Please try again.');
    } else {
      console.log(`Error updating password: ${error.message}`);
    }
    throw error; 
  }
};