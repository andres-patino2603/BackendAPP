const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

app.get('/api/clientes', async (req, res) => {
  const { cedula } = req.query;
  if (!cedula) return res.status(400).json({ error: 'Cédula requerida' });

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(`SELECT * FROM clientes WHERE cedula = ?`, [cedula]);
    await conn.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/clientes', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const { cedula, nombre, correo, edad } = req.body;
    const [result] = await conn.execute(
      `INSERT INTO clientes (cedula, nombre, correo, edad) VALUES (?, ?, ?, ?)`,
      [cedula, nombre, correo, edad]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/creditos', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const { cliente_id, monto, tasa_mensual, plazo_meses, cuota_fija_mensual, fecha_desembolso } = req.body;
    const [result] = await conn.execute(
      `INSERT INTO creditos (cliente_id, monto, tasa_mensual, plazo_meses, cuota_fija_mensual, fecha_desembolso)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [cliente_id, monto, tasa_mensual, plazo_meses, cuota_fija_mensual, fecha_desembolso]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/clientes_creditos', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(`
      SELECT 
        c.id AS cliente_id, c.nombre, c.cedula, c.correo, c.edad,
        cr.id AS credito_id, cr.monto, cr.tasa_mensual, cr.plazo_meses, 
        cr.cuota_fija_mensual, cr.fecha_desembolso
      FROM clientes c
      LEFT JOIN creditos cr ON c.id = cr.cliente_id
    `);
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 5000}`)
);
