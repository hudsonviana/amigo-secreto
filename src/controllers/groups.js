import { z } from 'zod';
import * as groupsService from '../services/groups.js';

export const getAll = async (req, res) => {
  const { id_event } = req.params;
  const items = await groupsService.getAll(parseInt(id_event));
  if (items) return res.json({ groups: items });
  res.json({ error: 'Ocorreu um erro.' });
};

export const getGroup = async (req, res) => {
  const { id, id_event } = req.params;
  const groupItem = await groupsService.getOne({
    id: parseInt(id),
    id_event: parseInt(id_event),
  });
  if (groupItem) return res.json({ group: groupItem });
  res.json({ error: 'Ocorreu um erro.' });
};

export const addGroup = async (req, res) => {
  const { id_event } = req.params;

  const addGroupSchema = z.object({
    name: z.string(),
  });

  const body = addGroupSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: 'Dados inválidos.' });

  const newGroup = await groupsService.add({
    ...body.data,
    id_event: parseInt(id_event),
  });

  if (newGroup) return res.status(201).json({ group: newGroup });
  res.json({ error: 'Ocorreu um erro.' });
};
