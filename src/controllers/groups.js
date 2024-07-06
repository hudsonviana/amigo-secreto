import * as groupsService from '../services/groups.js';

export const getAll = async (req, res) => {
  const { id_event } = req.params;

  const items = await groupsService.getAll(parseInt(id_event));

  if (items) return res.json({ groups: items });

  res.json({ error: 'Ocorreu um erro.' });
};
