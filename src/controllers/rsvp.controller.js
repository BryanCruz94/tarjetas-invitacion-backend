// src/controllers/rsvp.controller.js
const { getTestCellA1, appendRsvpRow } = require('../services/googleSheets.service');

async function testSheetsConnection(req, res) {
  try {
    // puedes pasar un eventId por query para probar un evento concreto
    const { eventId } = req.query; // /api/rsvp/test?eventId=babyshower-sofia

    const cellValue = await getTestCellA1(eventId);

    return res.status(200).json({
      ok: true,
      message: 'Conexión a Google Sheets OK',
      sheetCellA1: cellValue,
      eventId: eventId || 'default',
    });
  } catch (error) {
    console.error('Error al probar conexión con Google Sheets:', error);
    return res.status(500).json({
      ok: false,
      message: 'Error al conectar con Google Sheets',
      error: error.message,
    });
  }
}

async function createRsvp(req, res) {
  try {
    const { eventId } = req.params;

    const {
      nombreInvitado,
      confirmaAsistencia,
      cantidadAdultos,
      cantidadNinos,
      telefonoContacto,
      observaciones,
    } = req.body;

    if (!nombreInvitado || !confirmaAsistencia) {
      return res.status(400).json({
        ok: false,
        message: 'nombreInvitado y confirmaAsistencia son obligatorios',
      });
    }

    const adultos = Number.isFinite(Number(cantidadAdultos))
      ? Number(cantidadAdultos)
      : 0;
    const ninos = Number.isFinite(Number(cantidadNinos))
      ? Number(cantidadNinos)
      : 0;

    const telefono = telefonoContacto || '';
    const obs = observaciones || '';

    const rowValues = [
      nombreInvitado,
      confirmaAsistencia,
      adultos,
      ninos,
      telefono,
      obs,
    ];

    await appendRsvpRow(eventId, rowValues);

    return res.status(201).json({
      ok: true,
      message: 'Confirmación registrada correctamente',
      eventId,
    });
  } catch (error) {
    console.error('Error al registrar RSVP:', error);
    return res.status(500).json({
      ok: false,
      message: 'Error al guardar la confirmación',
      error: error.message,
    });
  }
}

module.exports = {
  testSheetsConnection,
  createRsvp,
};
