const fs = require('fs');
const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const routes = [
    '/',
    '/profile',
    '/create',
    '/edit'
    // ... añade todas tus rutas
];

async function renderView(view, data) {
    return new Promise((resolve, reject) => {
        app.render(view, data, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
}

async function getDatabaseResults() {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });



    try {
        const [results] = await connection.execute('SELECT * FROM users'); // Tu consulta SQL
        return results;
    } finally {
        connection.end(); // Cierra la conexión
    }
}

async function generateStaticHTML() {
    try {
        fs.mkdirSync('dist', { recursive: true });

        for (const route of routes) {
            const results = await getDatabaseResults(); // Obtiene los datos de la base de datos

            // Obtén el HTML renderizado usando la función renderView
            const htmlFromRenderView = await renderView('index', { results });

            const filePath = path.join(__dirname, 'dist', route === '/' ? 'index.html' : `${route}/index.html`);
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, htmlFromRenderView);
            console.log(`HTML estático generado para ${route} en ${filePath}`);

            // Elimina el código duplicado y la variable html
            // No necesitas simular la petición al servidor aquí
        }

        console.log('HTML estático generado correctamente.');
        process.exit(0);

    } catch (error) {
        console.error('Error al generar HTML estático:', error);
        process.exit(1);
    }
}

generateStaticHTML();