import express from 'express';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Load and compile the email template
    const templatePath = path.join(process.cwd(), 'templates', 'contactTemplate.html');
    const source = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(source);
    const html = template({ name, email, message });

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
      },
    });

    const mailOptions = {
      from: `"Resume Edge" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: 'New Contact Message - Resume Edge',
      html,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Thank you for reaching out to Resume Edge. Your message has been successfully delivered. We'll get back to you shortly.",
    });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    res.status(500).json({
      success: false,
      message: "Oops! We couldn't send your message at the moment. Please try again later or email us directly at support@resumeedge.com.",
    });
  }
});

export default router;
