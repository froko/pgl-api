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

  const shopMail = {
    from: '"PGL Shop" noreply@pgl.ch',
    to: ['froko@frokonet.ch'],
    //to: ['info@pglch'],
    //bcc: ['froko@frokonet.ch'],
    subject: `Neue Bestellung im PGL Shop`,
    html: req.body.shopMessage
  };

  const customerMail = {
    from: '"PGL Shop" noreply@pgl.ch',
    to: [req.body.email],
    subject: `Deine Bestellung im PGL Shop`,
    html: req.body.customerMessage,
    attachments: [
      {
        filename: 'PGL-QR-Einzahlungsschein.pdf',
        path: './public/PGL-QR-Einzahlung.pdf'
      }
    ]
  };

  try {
    const mailPromises = [mailer.sendMail(shopMail), mailer.sendMail(customerMail)];
    await Promise.all(mailPromises);
    res.status(200).json({ result: 'Emails sent' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 'Error sending emails' });
  }
}
