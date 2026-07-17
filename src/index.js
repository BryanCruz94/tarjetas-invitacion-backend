// src/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rsvpRoutes = require('./routes/rsvp.routes');

// Cargar .env
dotenv.config();

const { corsAllowedOrigins } = require('./config/envConfig');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Middlewares
app.use(cors({
  origin(origin, callback) {
    // Herramientas como Postman y peticiones entre servidores no envian Origin.
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, '');
    const isAllowed = corsAllowedOrigins.includes(normalizedOrigin);

    if (!isAllowed) {
      console.warn(`[CORS] Origen bloqueado: ${origin}`);
    }

    return callback(null, isAllowed);
  },
}));
app.use(express.json());

// Railway usa este endpoint para comprobar que el proceso esta disponible.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rutas
app.use('/api/rsvp', rsvpRoutes);

// Endpoint básico para probar que el servidor corre
app.get('/', (req, res) => {
  res.send('Backend tarjetas - Babyshower Sofía funcionando');
});

// Iniciar servidor
const server = app.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});

server.on('error', (error) => {
  console.error('[SERVER] No se pudo iniciar el servidor:', error);
  process.exit(1);
});
