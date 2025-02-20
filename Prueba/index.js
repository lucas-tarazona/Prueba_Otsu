const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las solicitudes (JSON)
app.use(express.json());  // Para que Express maneje datos JSON

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'Pedorro1234.', 
    database: 'Productos' 
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
    } else {
        console.log('Conectado a MySQL ');
    }
});

// Ruta para registro de usuario
app.post('/registro', (req, res) => {
    const { email, pass } = req.body;

    // Verificar si el correo ya está registrado
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            return res.status(400).send('El correo ya está registrado');
        }

        // Insertar nuevo usuario en la base de datos
        db.query('INSERT INTO Usuarios (email, pass) VALUES (?, ?)', [email, pass], (err, results) => {
            if (err) {
                console.error('Error al insertar usuario:', err);
                return res.status(500).send('Error en el servidor');
            }

            res.status(201).send('Usuario registrado correctamente');
        });
    });
});

// Ruta de login
app.post('/login', (req, res) => {
    const { email, pass } = req.body;

    // Verificar si el correo existe
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = results[0];

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        if (user.pass !== pass) {
            return res.status(400).send('Contraseña incorrecta');
        }

        
        res.redirect('/home.html');
    });
});

// Ruta para obtener los productos
app.get('/productos', (req, res) => {
    // Consultar todos los productos de la base de datos
    db.query('SELECT * FROM Producto', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).send('Error en el servidor');
        }

        res.json(results); // Enviar los productos en formato JSON
    });
});


// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
