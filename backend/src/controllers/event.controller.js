/**
 * Controller de eventos
 */
const eventService = require("../services/event.service");

async function listEvents(req, res, next) {
  try {
    const events = await eventService.listEvents();
    res.json(events);
  } catch (err) {
    next(err);
  }
}

async function createEvent(req, res, next) {
  try {
    const payload = req.body;
    // created_by a partir do token
    payload.created_by = req.user.id;
    const created = await eventService.createEvent(payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

module.exports = { listEvents, createEvent };
