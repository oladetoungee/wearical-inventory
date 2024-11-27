import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const firebaseCredentials = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);

  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
      databaseURL: "https://wearical-default-rtdb.firebaseio.com"
  });
}

export const verifyIdToken = async (token: string) => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export const adminAuth = admin.auth();
export const adminDb = admin.database();