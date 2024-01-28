import nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'm.aliadnanrauf@gmail.com',
		pass: process.env.EMAIL_PASSWORD,
	},
});

export async function POST(req: Request) {
	const { email, name } = await req.json();

	const token = jwt.sign({ email, name }, process.env.JWT_SECRET!, {
		expiresIn: '20m',
	});

	cookies().set({
		name: 'token',
		value: token,
	})

	const verificationUrl = `http://localhost:3000/verify?token=${token}`;

	try {
		transporter.sendMail({
			from: {
				name: 'Ali Enterprises',
				address: 'm.aliadnanrauf@gmail.com',
			},
			to: email,
			subject: 'Verify your email',
			html: `<div style="background-color: #f5f5f5; padding: 20px; font-family: 'Arial', sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #007BFF; text-align: center; margin-bottom: 20px;">Verify Your Email</h2>
              <p style="font-size: 16px; line-height: 1.6;">Thank you for choosing my awesome service! To get started, please verify your email by clicking the link below:</p>
              <p style="text-align: center; margin: 20px 0;"><a href="${verificationUrl}" style="display: inline-block; padding: 12px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-size: 1.2rem;">Verify Account</a></p>
              <p style="font-size: 14px; color: #777;">If you didn't create an account or don't recognize this activity, please ignore this email. Your security is important to us.</p>
              <p style="font-size: 14px; color: #777;">Best regards,<br/>Mohammad Ali</p>
            </div>
          </div>`,
		});

		return NextResponse.json(
			{ message: 'Verification email sent successfully' },
			{ status: 200 }
		);
	} catch (err: unknown) {
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
