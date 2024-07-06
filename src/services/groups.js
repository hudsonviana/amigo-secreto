import { PrismaClient } from '@prisma/client';
import * as eventsService from '../services/events.js';

const prisma = new PrismaClient();

export const getAll = async (id_event) => {
  try {
    return await prisma.eventGroup.findMany({ where: { id_event: id_event } });
  } catch (error) {
    return false;
  }
};

export const getOne = async ({ id, id_event = undefined }) => {
  try {
    return await prisma.eventGroup.findFirst({ where: { id, id_event } });
  } catch (error) {
    return false;
  }
};

export const add = async (data) => {
  try {
    if (data.id_event) {
      const eventItem = await eventsService.getOne(data.id_event);

      if (eventItem) {
        return await prisma.eventGroup.create({ data: data });
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const update = async ({ id, id_event = undefined }, data) => {
  try {
    return await prisma.eventGroup.update({
      where: { id, id_event },
      data: data,
    });
  } catch (error) {
    return false;
  }
};
