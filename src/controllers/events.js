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

export const updateEvent = async (req, res) => {
  const { id } = req.params;

  const updateEventSchema = z.object({
    status: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
  });

  const body = updateEventSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: 'Dados inválidos.' });

  const updatedEvent = await eventsService.update(body.data, parseInt(id));

  if (updatedEvent) {
    if (updatedEvent.status) {
      // TODO: Fazer o sorteio
    } else {
      // TODO: Limpar o sorteio
    }

    return res.json({ event: updatedEvent });
  }

  res.json({ error: 'Ocorreu um erro.' });
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  const deletedEvent = await eventsService.remove(parseInt(id));

  if (deletedEvent) return res.json({ event: deletedEvent });

  res.json({ error: 'Ocorreu um erro.' });
};
