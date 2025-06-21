const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PUERTO = 3000;

// Configuración de almacenamiento con Multer
const almacenamiento = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    const nombre = Date.now() + path.extname(file.originalname);
    cb(null, nombre);
  }
});
const upload = multer({ storage: almacenamiento });

// Para servir archivos estáticos (HTML, CSS, PDFs...)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Ruta para manejar la subida
app.post('/subir', upload.single('archivo'), (req, res) => {
  const titulo = req.body.titulo;
  const archivo = req.file.filename;

  // Guardamos el título y la ruta del archivo en un archivo JSON (simulando una base de datos)
  const nuevoLibro = { titulo, archivo };
  const rutaJSON = './public/uploads/registros.json';

  let registros = [];
  if (fs.existsSync(rutaJSON)) {
    registros = JSON.parse(fs.readFileSync(rutaJSON));
  }
  registros.push(nuevoLibro);
  fs.writeFileSync(rutaJSON, JSON.stringify(registros, null, 2));

  res.redirect('/galeria.html');
});
