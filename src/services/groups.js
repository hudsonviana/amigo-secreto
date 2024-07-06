import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (id_event) => {
  try {
    return await prisma.eventGroup.findMany({ where: { id_event: id_event } });
  } catch (error) {
    return false;
  }
};
