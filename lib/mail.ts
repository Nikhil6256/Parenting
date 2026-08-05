import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  await transporter.sendMail({
    from: `"${data.name}" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL,
    replyTo: data.email,
    subject: `[Rise With Rupali] ${data.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #558e55;">New Contact Message</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr/>
        <p>${data.message.replace(/\n/g, '<br/>')}</p>
      </div>
    `,
  });
}

export async function sendPurchaseConfirmation(data: {
  to: string;
  name: string;
  courseName: string;
  amount: number;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  await transporter.sendMail({
    from: `"Rise With Rupali" <${process.env.SMTP_USER}>`,
    to: data.to,
    subject: `You're enrolled in ${data.courseName}! 🎉`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f4f7f4; padding: 32px; border-radius: 12px;">
        <h1 style="color: #558e55; font-size: 28px;">Congratulations, ${data.name}! 🌱</h1>
        <p style="color: #4a5568; font-size: 16px;">You've successfully enrolled in <strong>${data.courseName}</strong>.</p>
        <p style="color: #4a5568;">Amount paid: <strong>₹${data.amount}</strong></p>
        <a href="${process.env.NEXTAUTH_URL}/my-courses" 
           style="display: inline-block; background: #558e55; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          Start Learning →
        </a>
        <p style="color: #718096; margin-top: 24px; font-size: 14px;">With love, Rupali 💚</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(data: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS in .env.local');
  }

  await transporter.sendMail({
    from: `"Rise With Rupali" <${process.env.SMTP_USER}>`,
    to: data.to,
    subject: 'Reset Your Password — Rise With Rupali',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f4f7f4; padding: 32px; border-radius: 12px;">
        <h1 style="color: #558e55; font-size: 24px;">Reset Your Password 🔒</h1>
        <p style="color: #4a5568; font-size: 16px;">Hi ${data.name},</p>
        <p style="color: #4a5568;">We received a request to reset your password. Click the button below to set a new one. This link expires in <strong>1 hour</strong>.</p>
        <a href="${data.resetUrl}"
           style="display: inline-block; background: #558e55; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; margin: 24px 0; font-weight: bold; font-size: 16px;">
          Reset My Password →
        </a>
        <p style="color: #718096; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email. Your password will not change.</p>
        <p style="color: #718096; margin-top: 8px; font-size: 12px;">This link will expire in 1 hour for security.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #718096; font-size: 14px;">With love, Rupali 💚</p>
      </div>
    `,
  });
}
