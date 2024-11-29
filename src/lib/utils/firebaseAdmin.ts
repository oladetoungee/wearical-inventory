import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  // Check if FIREBASE_ADMIN_KEY exists
  const firebaseAdminKey = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_KEY;

  if (!firebaseAdminKey) {
    throw new Error('FIREBASE_ADMIN_KEY environment variable is not defined!');
  }

  // Decode the base64 string
  const firebaseCredentials = JSON.parse(
    Buffer.from(firebaseAdminKey, 'base64').toString('utf8')
  );

  console.log('firebaseCredentials:', firebaseCredentials);

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