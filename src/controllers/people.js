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

const cpfFormat = (val) => val.replace(/\.|-/gm, '').padStart(11, '0');

export const addPerson = async (req, res) => {
  const { id_event, id_group } = req.params;

  const addPersonSchema = z.object({
    name: z.string(),
    cpf: z.string().transform(cpfFormat),
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

export const updatePerson = async (req, res) => {
  const { id, id_event, id_group } = req.params;

  const updatePersonSchema = z.object({
    name: z.string().optional(),
    cpf: z.string().transform(cpfFormat).optional(),
    matched: z.string().optional(),
  });

  const body = updatePersonSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: 'Dados inválidos.' });

  const updatedPerson = await peopleService.update(
    {
      id: parseInt(id),
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
    },
    body.data
  );

  if (updatedPerson) {
    const personItem = await peopleService.getOne({
      id: parseInt(id),
      id_event: parseInt(id_event),
    });
    return res.json({ person: personItem });
  }

  res.json({ error: 'Ocorreu um erro.' });
};

export const deletePerson = async (req, res) => {
  const { id, id_event, id_group } = req.params;

  const deletedPerson = await peopleService.remove({
    id: parseInt(id),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (deletedPerson) return res.json({ person: deletedPerson });
  res.json({ error: 'Ocorreu um erro.' });
};
