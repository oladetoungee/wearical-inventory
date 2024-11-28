import { adminAuth, adminDb } from "@/lib/utils/firebaseAdmin";
import { sendMail } from "@/lib/utils/sendMail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Ensure the request is a POST method
    if (req.method !== 'POST') {
      return NextResponse.json({ error: "Invalid request method" }, { status: 405 });
    }

    // Parse the request body and handle invalid JSON
    const body = await req.json().catch(() => null);
    if (!body || !body.uid) {
      return NextResponse.json({ error: "Invalid JSON or missing required fields" }, { status: 400 });
    }

    const { uid } = body;

    // Fetch the user record from Firebase Admin
    const userRecord = await adminAuth.getUser(uid).catch(() => null);
    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove user data from the database
    await adminDb.ref(`users/${uid}`).remove();

    // Delete the user account from Firebase Authentication
    await adminAuth.deleteUser(uid);

    // Send notification email to the user
    await sendMail({
      to: userRecord.email || "no-reply@yourdomain.com",
      subject: `Your Wearical Account Has Been Removed`,
      title: "Account Removal Notification",
      paragraphs: [
        `Dear ${userRecord.displayName || "User"},`,
        "We regret to inform you that your account has been removed from our platform.",
        "If you believe this is an error or you have any questions, please contact our support team.",
      ],
      buttonText: "Contact Support",
      buttonLink: "https://wearical-inventory-tnmx.vercel.app/sign-in",
    });

    console.log(`User deleted successfully. UID: ${uid}`);

    return NextResponse.json({ message: "User deleted and notified successfully." }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting employee:", error);

    // Differentiate between specific and general errors
    const errorMessage =
      error.code === "auth/user-not-found"
        ? "User not found"
        : "Failed to delete employee";
    const errorStatus = error.code === "auth/user-not-found" ? 404 : 500;

    return NextResponse.json({ error: errorMessage }, { status: errorStatus });
  }
}
