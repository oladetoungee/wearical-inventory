import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { adminAuth, adminDb } from "@/lib/utils/firebaseAdmin";
import { sendMail } from "@/lib/utils/sendMail";

export async function POST(req: Request) {
  try {
    const { email, fullName, phone, role } = await req.json();

    if (!email || !fullName || !phone || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const password = randomBytes(8).toString("hex");

    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: fullName,
      emailVerified: true,
    });

    const userDoc = {
      email,
      fullName,
      phone,
      role,
      createdBy: "admin",
      createdAt: new Date().toISOString(),
      uid: userRecord.uid,
    };

    await adminDb.ref(`users/${userRecord.uid}`).set(userDoc);

    await sendMail({
      to: email,
      subject: `Welcome to Wearical, ${fullName}!`,
      title: "Welcome to Wearical!",
      paragraphs: [
        `Hi ${fullName},`,
        "We're excited to have you as part of Wearical!",
        "Here are your login credentials:",
        `- Email: <span style="color: #333; font-weight: bold;">${email}</span>`,
        `- Password: ${password}`,
      ],
      buttonText: "Login Now",
      buttonLink: "https://wearical-inventory-tnmx.vercel.app/sign-in",
    });

    console.log(`Employee account created. Email: ${email}, Password: ${password}`);

    return NextResponse.json({ email, password }, { status: 200 });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json({ error: "Failed to add employee" }, { status: 500 });
  }
}
