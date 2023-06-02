import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

require('dotenv').config();

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ result: 'Method not allowed' });
    return;
  }

  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    const entries = await prisma.guestbookEntry.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.status(200).json(entries);
  }

  if (req.method === 'POST') {
    const entry = JSON.parse(req.body);
    const mailer = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT as unknown as number,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
      }
    });

    try {
      await prisma.guestbookEntry.create({
        data: {
          name: entry.name,
          email: entry.email,
          message: entry.message,
          published: true
        }
      });

      const contactMail = {
        from: '"PGL Gästebuch" noreply@pgl.ch',
        to: ['froko@frokonet.ch'],
        subject: `Neuer Eintrag von ${entry.name} (${entry.email})`,
        text: entry.message
      };
      await mailer.sendMail(contactMail);
      res.status(200);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
}
