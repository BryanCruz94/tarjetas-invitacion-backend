// src/config/envConfig.js
const dotenv = require('dotenv');

// Cargar variables de entorno desde .env en desarrollo
dotenv.config();

const requiredEnvVars = [
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
  'SHEETS_RSVP_SPREADSHEET_ID',
  'SHEETS_RSVP_SHEET_NAME',
];

requiredEnvVars.forEach((name) => {
  if (!process.env[name]) {
    console.warn(`[WARN] Falta la variable de entorno: ${name}`);
  }
});

// Arreglar saltos de línea de la private key (Railway y .env suelen guardarla con \n)
const fixedPrivateKey = process.env.GOOGLE_PRIVATE_KEY
  ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

module.exports = {
  googleProjectId: process.env.GOOGLE_PROJECT_ID,
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googlePrivateKey: fixedPrivateKey,
  sheetsRsvpSpreadsheetId: process.env.SHEETS_RSVP_SPREADSHEET_ID,
  sheetsRsvpSheetName: process.env.SHEETS_RSVP_SHEET_NAME,
};
