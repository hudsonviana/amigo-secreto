import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async ({ id_event, id_group = undefined }) => {
  try {
    return await prisma.eventPeople.findMany({ where: { id_event, id_group } });
  } catch (error) {
    return false;
  }
};
