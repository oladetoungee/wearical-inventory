import { adminAuth, adminDb } from "@/lib/utils/firebaseAdmin";
import { sendMail } from "@/lib/utils/sendMail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Ensure request method is POST
    if (req.method !== 'POST') {
      return NextResponse.json({ error: "Invalid request method" }, { status: 405 });
    }

    // Log and sanitize the request body
    const bodyText = await req.text().catch(() => null);
    console.log("Raw request body:", bodyText);

    if (!bodyText) {
      return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
    }

    const sanitizedBodyText = bodyText.replace(/[\x00-\x1F\x7F-\x9F]/g, ""); // Remove control characters

    let body;
    try {
      body = JSON.parse(sanitizedBodyText);
    } catch {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    // Validate the uid field
    const { uid } = body;
    if (!uid) {
      return NextResponse.json({ error: "Missing required 'uid' field" }, { status: 400 });
    }

    // Fetch user record
    const userRecord = await adminAuth.getUser(uid).catch(() => null);
    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove user data and delete user
    await adminDb.ref(`users/${uid}`).remove();
    await adminAuth.deleteUser(uid);

    // Send notification email
    await sendMail({
      to: userRecord.email || "no-reply@yourdomain.com",
      subject: "Your Wearical Account Has Been Removed",
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

    const errorMessage =
      error.code === "auth/user-not-found"
        ? "User not found"
        : "Failed to delete employee";
    const errorStatus = error.code === "auth/user-not-found" ? 404 : 500;

    return NextResponse.json({ error: errorMessage }, { status: errorStatus });
  }
}

