import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'GET' && req.method !== 'PUT' && req.method !== 'DELETE') {
    res.status(405).json({ result: 'Method not allowed' });
    return;
  }

  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    const entries = await prisma.guestbookEntry.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.status(200).json(entries);
  }

  if (req.method === 'PUT') {
    const entry = JSON.parse(req.body);
    prisma.guestbookEntry
      .update({
        where: {
          id: entry.id
        },
        data: {
          published: entry.published
        }
      })
      .then(() => res.status(200).json({}));
  }

  if (req.method === 'DELETE') {
    const entry = JSON.parse(req.body);
    prisma.guestbookEntry
      .delete({
        where: {
          id: entry.id
        }
      })
      .then(() => res.status(200).json({}));
  }
}
