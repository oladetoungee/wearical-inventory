import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // databaseURL: 'https://your-project.firebaseio.com',
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { email, fullName, phone, role } = body;

    // Generate random password
    const password = Math.random().toString(36).slice(-8);

    // Create user with Firebase Admin SDK
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    // Save user details in the database
    await admin.database().ref(`employees/${user.uid}`).set({
      email,
      fullName,
      phone,
      role,
      createdAt: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json({
      message: 'Employee added successfully',
      userId: user.uid,
    });
  } catch (error) {
    console.error('Error in /api/add-employee:', error);
    return NextResponse.json({ error: 'Failed to add employee' }, { status: 500 });
  }
}
