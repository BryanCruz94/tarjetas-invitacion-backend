// src/routes/rsvp.routes.js
const express = require('express');
const {
  testSheetsConnection,
  createRsvp,
} = require('../controllers/rsvp.controller');

const router = express.Router();

// Hola mundo: probar conexión a Google Sheets leyendo A1
router.get('/test', testSheetsConnection);

// Registrar RSVP para un evento
router.post('/:eventId', createRsvp);

module.exports = router;
