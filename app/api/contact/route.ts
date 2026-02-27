import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { name, email, message } = data;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // 1. Save to database
        await prisma.contactMessage.create({
            data: { name, email, message },
        });

        // 2. Send email notification via nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Standard service, can be changed via ENV
            auth: {
                user: process.env.EMAIL_USER || 'placeholder@gmail.com',
                pass: process.env.EMAIL_PASS || 'placeholder',
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Portfolio Message from ${name}`,
            text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        };

        // If ENV is not set, we skip actually sending to avoid crashes
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Error submitting message' }, { status: 500 });
    }
}
