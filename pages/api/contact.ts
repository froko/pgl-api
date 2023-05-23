import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

require('dotenv').config();

type Data = {
  result: string;
};

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = process.env;

if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASSWORD) {
  throw new Error('Missing email configuration');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(405).json({ result: 'Method not allowed' });
    return;
  }

  const mailer = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT as unknown as number,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  });
  
  const payload = JSON.parse(req.body);

  const contactMail = {
    from: '"PGL Kontaktformular" noreply@pgl.ch',
    to: ['info@pglch'],
    bcc: ['froko@frokonet.ch'],
    subject: `Neue Nachricht von ${payload.name} (${payload.email})`,
    text: payload.message
  };

  try {
    await mailer.sendMail(contactMail);
    res.status(200).json({ result: 'Email sent' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 'Error sending email' });
  }
}
