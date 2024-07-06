import { Router } from 'express';
import * as auth from '../controllers/auth.js';
import * as events from '../controllers/events.js';
import * as groups from '../controllers/groups.js';

const router = Router();

router.post('/login', auth.login);
router.get('/ping', auth.validate, (req, res) =>
  res.json({ pong: true, admin: true })
);

router.get('/events', auth.validate, events.getAll);
router.get('/events/:id', auth.validate, events.getEvent);
router.post('/events', auth.validate, events.addEvent);
router.put('/events/:id', auth.validate, events.updateEvent);
router.delete('/events/:id', auth.validate, events.deleteEvent);

router.get('/events/:id_event/groups', auth.validate, groups.getAll);

export default router;
