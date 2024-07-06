import { z } from 'zod';
import * as eventsService from '../services/events.js';

export const getAll = async (req, res) => {
  const items = await eventsService.getAll();

  if (items) return res.json({ events: items });
  res.json({ error: 'Ocorreu um erro.' });
};

export const getEvent = async (req, res) => {
  const { id } = req.params;
  const eventItem = await eventsService.getOne(parseInt(id));

  if (eventItem) return res.json({ event: eventItem });
  res.json({ error: 'Ocorreu um erro.' });
};

export const addEvent = async (req, res) => {
  const addEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean(),
  });

  const body = addEventSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: 'Dados inválidos.' });

  const newEvent = await eventsService.add(body.data);
  if (newEvent) return res.status(201).json({ event: newEvent });

  res.json({ error: 'Ocorreu um erro.' });
};
