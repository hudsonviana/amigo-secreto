import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async () => {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    return false;
  }
};

export const getOne = async (id) => {
  try {
    return await prisma.event.findFirst({ where: { id: id } });
  } catch (error) {
    return false;
  }
};

export const add = async (data) => {
  try {
    return await prisma.event.create({ data });
  } catch (error) {
    return false;
  }
};
