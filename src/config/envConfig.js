// src/config/envConfig.js
const dotenv = require('dotenv');

// Cargar variables de entorno desde .env en desarrollo
dotenv.config();

const requiredEnvVars = [
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
  'SHEETS_RSVP_SPREADSHEET_ID',
  'SHEETS_RSVP_SHEET_NAME',
  'CORS_ALLOWED_ORIGINS',
];

requiredEnvVars.forEach((name) => {
  if (!process.env[name]) {
    console.warn(`[WARN] Falta la variable de entorno: ${name}`);
  }
});

// Arreglar saltos de línea y espacios
function normalizePrivateKey(value) {
  if (!value) return undefined;

  const trimmedValue = value.trim();
  const hasWrappingQuotes =
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"));
  const unquotedValue = hasWrappingQuotes
    ? trimmedValue.slice(1, -1)
    : trimmedValue;

  return unquotedValue
    .replace(/\\\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .trim();
}

const fixedPrivateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

const corsAllowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

module.exports = {
  googleProjectId: process.env.GOOGLE_PROJECT_ID?.trim(),
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL?.trim(),
  googlePrivateKey: fixedPrivateKey,
  sheetsRsvpSpreadsheetId: process.env.SHEETS_RSVP_SPREADSHEET_ID?.trim(),
  sheetsRsvpSheetName: process.env.SHEETS_RSVP_SHEET_NAME?.trim(),
  corsAllowedOrigins,
};
