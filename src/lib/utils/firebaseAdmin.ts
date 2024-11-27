import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
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