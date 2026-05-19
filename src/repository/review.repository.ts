// review.repository.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createReview = async (userId: number, data: CreateReviewDto) => {
  const newReview = await prisma.review.create({
    data: {
      userId,
      storeId: data.storeId,
      content: data.content,
      score: data.score,
    },
  });

  return newReview;
};

export const findReviewsByUserId = async (userId: number) => {
  return await prisma.review.findMany({
    where: {
      userId,
    },
  });
};
