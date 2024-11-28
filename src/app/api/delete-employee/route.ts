
import { adminAuth, adminDb } from "@/lib/utils/firebaseAdmin";
import { sendMail } from "@/lib/utils/sendMail"; 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: "Invalid request method" }, { status: 405 });
      }
  
      const body = await req.json().catch(() => null);
      if (!body) {
        return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
      }
    const { uid } = body;

    const userRecord = await adminAuth.getUser(uid);  

    await adminDb.ref(`users/${uid}`).remove();

    await adminAuth.deleteUser(uid);

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


    return NextResponse.json({ message: "User deleted and notified successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
