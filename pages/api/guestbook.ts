import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
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
    prisma.guestbookEntry
      .create({
        data: {
          name: entry.name,
          email: entry.email,
          message: entry.message,
          published: true
        }
      })
      .then(() => res.status(200).json({}));
  }
}
