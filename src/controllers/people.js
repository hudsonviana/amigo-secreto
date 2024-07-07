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
