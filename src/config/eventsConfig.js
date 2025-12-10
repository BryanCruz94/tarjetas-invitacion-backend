const { sheetsRsvpSpreadsheetId, sheetsRsvpSheetName } = require('./envConfig');

const EVENTS_SHEETS_CONFIG = {
  // Evento actual (ejemplo)
  'babyshower-sofia': {
    spreadsheetId: sheetsRsvpSpreadsheetId,
    sheetName: 'INVITADOS_SOFIA',
  },

  // Nuevo evento / nueva tarjeta
  'cena-navidena-centremyp': {
    spreadsheetId: sheetsRsvpSpreadsheetId,
    sheetName: 'CENA_CENTREMYP_2025',
  },
};

/**
 * Devuelve la config (spreadsheetId + sheetName) para un eventId.
 * Si no encuentra el eventId, usa la hoja por defecto de envConfig.
 */
function getSheetConfigByEventId(eventId) {
  if (eventId && EVENTS_SHEETS_CONFIG[eventId]) {
    return EVENTS_SHEETS_CONFIG[eventId];
  }

  // Fallback: config por defecto
  return {
    spreadsheetId: sheetsRsvpSpreadsheetId,
    sheetName: sheetsRsvpSheetName,
  };
}

module.exports = {
  getSheetConfigByEventId,
};
