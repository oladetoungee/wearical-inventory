import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/utils/sendMail";

export async function POST(req: NextRequest) {
  try {
    const { to, fullName, password } = await req.json();

    if (!to || !fullName || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await sendMail({
      to,
      subject: `Welcome to Wearical, ${fullName}!`,
      title: "Welcome to Wearical!",
      paragraphs: [
        `Hi ${fullName},`,
        "We're excited to have you as part of Wearical!",
        "Here are your login credentials:",
        `- Email: ${to}`,
        `- Password: ${password}`,
      ],
      buttonText: "Login Now",
      buttonLink: "https://wearical-inventory-tnmx.vercel.app/sign-in",
    });

    return NextResponse.json({ message: "New member email sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
