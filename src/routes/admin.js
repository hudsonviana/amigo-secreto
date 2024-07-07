import { Router } from 'express';
import * as auth from '../controllers/auth.js';
import * as events from '../controllers/events.js';
import * as groups from '../controllers/groups.js';
import * as people from '../controllers/people.js';

const router = Router();

router.post('/login', auth.login);
router.get('/ping', auth.validate, (req, res) => res.json({ pong: true, admin: true }));

router.get('/events', auth.validate, events.getAll);
router.get('/events/:id', auth.validate, events.getEvent);
router.post('/events', auth.validate, events.addEvent);
router.put('/events/:id', auth.validate, events.updateEvent);
router.delete('/events/:id', auth.validate, events.deleteEvent);

router.get('/events/:id_event/groups', auth.validate, groups.getAll);
router.get('/events/:id_event/groups/:id', auth.validate, groups.getGroup);
router.post('/events/:id_event/groups', auth.validate, groups.addGroup);
router.put('/events/:id_event/groups/:id', auth.validate, groups.updateGroup);
router.delete('/events/:id_event/groups/:id', auth.validate, groups.deleteGroup);

router.get('/events/:id_event/groups/:id_group/people', auth.validate, people.getAll);
router.get('/events/:id_event/groups/:id_group/people/:id', auth.validate, people.getPerson);
router.post('/events/:id_event/groups/:id_group/people', auth.validate, people.addPerson);
router.put('/events/:id_event/groups/:id_group/people/:id', auth.validate, people.updatePerson);

export default router;

//
// https://www.youtube.com/watch?v=mKa1MuB1HMk
