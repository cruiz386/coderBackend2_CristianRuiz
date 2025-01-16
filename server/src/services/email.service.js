import { createTransport } from "nodemailer";
import 'dotenv/config';

export const transporter = createTransport({
        service: "gmail",
        secure: true,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });