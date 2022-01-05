import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || session.user?.email !== process.env.NEXT_PUBLIC_USER_EMAIL) {
    res.status(401).send({ message: 'Unauthenticated' });
  }

  if (req.method === 'GET') {
    try {
      const result = await prisma.food.findMany({
        where: {
          userId: process.env.USER_ID,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({ message: 'Server Error' });
    }
  }

  if (req.method === 'POST') {
    const { restaurantName, jakeRating, jenRating, link, image } = req.body;

    try {
      const result = await prisma.food.create({
        data: {
          userId: session?.id as string,
          restaurantName,
          jakeRating,
          jenRating,
          link,
          image,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({ message: 'Server Error' });
    }
  }
}
