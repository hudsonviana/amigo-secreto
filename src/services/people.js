import { PrismaClient } from '@prisma/client';
import * as groupsService from '../services/groups.js';

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

export const add = async (data) => {
  try {
    if (!data.id_group) return false;

    const group = await groupsService.getOne({
      id: data.id_group,
      id_event: data.id_event,
    });

    if (!group) return false;

    return await prisma.eventPeople.create({ data: data });
  } catch (error) {
    return false;
  }
};

export const update = async ({ id, id_event, id_group }, data) => {
  try {
    if (!id_group) return false;
    return await prisma.eventPeople.updateMany({ where: { id, id_event, id_group }, data });
  } catch (error) {
    return false;
  }
};

export const remove = async ({ id, id_event, id_group }) => {
  try {
    if (!id) return false;
    return await prisma.eventPeople.delete({ where: { id, id_event, id_group } });
  } catch (error) {
    return false;
  }
};
