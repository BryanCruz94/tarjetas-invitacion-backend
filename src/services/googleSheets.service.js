// src/services/googleSheets.service.js
const { google } = require('googleapis');
const {
  googleClientEmail,
  googlePrivateKey,
  sheetsRsvpSpreadsheetId,
  sheetsRsvpSheetName,
} = require('../config/envConfig');

let sheetsClient;

/**
 * Inicializa el cliente de Google Sheets usando JWT
 */
async function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  if (!googleClientEmail || !googlePrivateKey) {
    throw new Error(
      'Credenciales de Google incompletas. Revisa GOOGLE_CLIENT_EMAIL y GOOGLE_PRIVATE_KEY'
    );
  }

  console.log('[GoogleSheets] Usando service account:', googleClientEmail);

  const auth = new google.auth.JWT({
    email: googleClientEmail,
    key: googlePrivateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  // Forzamos la obtención del token para detectar errores temprano
  await auth.authorize();

  sheetsClient = google.sheets({ version: 'v4', auth });
  return sheetsClient;
}

/**
 * Prueba de conexión: lee el valor de la celda A1
 */
async function getTestCellA1() {
  const sheets = await getSheetsClient();

  console.log('[GoogleSheets][TEST] SpreadsheetId:', sheetsRsvpSpreadsheetId);
  console.log('[GoogleSheets][TEST] SheetName:', sheetsRsvpSheetName);

  const range = `${sheetsRsvpSheetName}!A1`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetsRsvpSpreadsheetId,
    range,
  });

  const values = response.data.values;
  const cellValue = values && values[0] && values[0][0] ? values[0][0] : null;

  return cellValue;
}

/**
 * Agrega una fila a la hoja de RSVP.
 * [Nombre, Confirma, Adultos, Niños, Teléfono, Observaciones]
 */
async function appendRsvpRow(rowValues) {
  const sheets = await getSheetsClient();

  const range = `${sheetsRsvpSheetName}!A:F`; // Ajusta si hay más columnas
  const resource = {
    values: [rowValues],
  };

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: sheetsRsvpSpreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource,
  });

  return response.data;
}

module.exports = {
  getTestCellA1,
  appendRsvpRow,
};
