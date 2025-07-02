import express, { Request, Response } from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req: Request, res: Response): Promise<any> => {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
        return res.status(400).json({ error: 'Missing to, subject, or body.' });
    }

    try{
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject,
            html: `<p>${body}</p>`,
    });

        res.status(200).json({ 
            success: true, 
            messageId: data?.data?.id
        });
    } 
    catch (err) {
        console.error('Email error:', err);
        res.status(500).json({ success: false, err: 'Failed to send email.' });
    }
})

export default router;
