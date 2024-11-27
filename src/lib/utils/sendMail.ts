
import nodemailer from "nodemailer";
import { generalEmailTemplate } from "./emailTemplate";

type SendMailOptions = {
  to: string;
  subject: string;
  title: string;
  paragraphs: string[];
  buttonText?: string;
  buttonLink?: string;
};

export const sendMail = async ({
  to,
  subject,
  title,
  paragraphs,
  buttonText,
  buttonLink,
}: SendMailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: generalEmailTemplate({ title, paragraphs, buttonText, buttonLink }),
  };

  await transporter.sendMail(mailOptions);
};
