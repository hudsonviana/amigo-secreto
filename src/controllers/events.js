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
