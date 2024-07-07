import { z } from 'zod';
import * as peopleService from '../services/people.js';

export const getAll = async (req, res) => {
  const { id_event, id_group } = req.params;

  const items = await peopleService.getAll({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (items) return res.json({ people: items });

  res.json({ error: 'Ocorreu um erro.' });
};

export const getPerson = async (req, res) => {
  const { id, id_event, id_group } = req.params;

  const personItem = await peopleService.getOne({
    id: parseInt(id),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (personItem) return res.json({ person: personItem });

  res.json({ error: 'Ocorreu um erro.' });
};

export const addPerson = async (req, res) => {
  const { id_event, id_group } = req.params;

  const addPersonSchema = z.object({
    name: z.string(),
    cpf: z.string().transform((val) => val.replace(/\.|-/gm, '').padStart(11, '0')),
  });

  const body = addPersonSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: 'Dados inválidos.' });

  const newPerson = await peopleService.add({
    ...body.data,
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (newPerson) return res.status(201).json({ person: newPerson });
  res.json({ error: 'Ocorreu um erro.' });
};
