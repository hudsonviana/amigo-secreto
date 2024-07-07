import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async ({ id_event, id_group = undefined }) => {
  try {
    return await prisma.eventPeople.findMany({ where: { id_event, id_group } });
  } catch (error) {
    return false;
  }
};

export const getOne = async ({ id, id_event, id_group, cpf }) => {
  try {
    if (!id_event || (!id && !cpf)) return false;
    return await prisma.eventPeople.findFirst({ where: { id, id_event, id_group, cpf } });
  } catch (error) {
    return false;
  }
};
