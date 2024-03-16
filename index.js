const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.use(express.json());
app.use(cors());

// Define las rutas para consultar e insertar información de la tabla Empleado
// Ruta para consultar todos los empleados
app.get('/empleados', (req, res) => {
    db.query('SELECT * FROM Empleado', (err, result) => {
        if (err) {
            console.error('Error al consultar empleados:', err);
            res.status(500).send('Error del servidor al consultar empleados');
            return;
        }
        res.json(result);
    });
});

// Ruta para insertar un nuevo empleado
app.post('/empleados', (req, res) => {
    const { nombre, fechaIngreso, salario } = req.body;
    db.query(
        'INSERT INTO Empleado (Nombre, Fecha_Ingreso, Salario) VALUES (?, ?, ?)',
        [nombre, fechaIngreso, salario],
        (err, result) => {
            if (err) {
                console.error('Error al insertar empleado:', err);
                res.status(500).send('Error del servidor al insertar empleado');
                return;
            }
            res.status(201).send('Empleado insertado correctamente');
        }
    );
});

// Define las rutas para consultar, eliminar e insertar información de la tabla Solicitud

// Ruta para consultar todas las solicitudes
app.get('/solicitudes', (req, res) => {
    db.query(
        'SELECT s.*, e.id AS IdEmpleado, e.Nombre AS NombreEmpleado FROM Solicitud s INNER JOIN Empleado e ON s.ID_Empleado = e.ID',
        (err, result) => {
            if (err) {
                console.error('Error al consultar solicitudes:', err);
                res.status(500).send('Error del servidor al consultar solicitudes');
                return;
            }
            res.json(result);
        }
    );
});
// Ruta para insertar una nueva solicitud
app.post('/solicitudes', (req, res) => {
    const { codigo, descripcion, resumen, idEmpleado } = req.body;
    db.query(
        'INSERT INTO Solicitud (Codigo, Descripcion, Resumen, ID_Empleado) VALUES (?, ?, ?, ?)',
        [codigo, descripcion, resumen, idEmpleado],
        (err, result) => {
            if (err) {
                console.error('Error al insertar solicitud:', err);
                res.status(500).send('Error del servidor al insertar solicitud');
                return;
            }
            res.status(201).send('Solicitud insertada correctamente');
        }
    );
});
// Ruta para eliminar una solicitud por su ID
app.delete('/solicitudes/:id', (req, res) => {
    const idSolicitud = req.params.id;
    db.query('DELETE FROM Solicitud WHERE ID = ?', [idSolicitud], (err, result) => {
        if (err) {
            console.error('Error al eliminar solicitud:', err);
            res.status(500).send('Error del servidor al eliminar solicitud');
            return;
        }
        res.send('Solicitud eliminada correctamente');
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
