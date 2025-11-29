// src/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rsvpRoutes = require('./routes/rsvp.routes');

// Cargar .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/rsvp', rsvpRoutes);

// Endpoint básico para probar que el servidor corre
app.get('/', (req, res) => {
  res.send('Backend tarjetas - Babyshower Sofía funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
