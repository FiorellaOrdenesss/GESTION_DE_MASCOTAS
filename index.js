// ------------------- index.js -------------------
// declaramos las dependencias necesarias para el proyecto
// importamos Express para crear el servidor web y manejar las rutas
// sequelize es la instancia de conexión a la base de datos, 
// mientras que Cliente y Mascota son los modelos que representan las tablas correspondientes en la base de datos
const express = require("express");
// importamos sequelize y los modelos Cliente y Mascota desde el archivo db.js
const { sequelize, Cliente, Mascota } = require("./db");
// creamos una instancia de Express y configuramos el middleware para parsear JSON
const app = express();
app.use(express.json());
// sincronizamos la base de datos y mostramos un mensaje en la consola cuando esté lista
sequelize.sync().then(() => {
    console.log("Base de datos sincronizada");
});

// ------------------- CRUD CLIENTES -------------------
// definimos las rutas para manejar las operaciones CRUD de clientes
// CRUD: Create, Read, Update, Delete
// GET /clientes: devuelve una lista de todos los clientes
app.get("/clientes", async (req, res) => {
    const clientes = await Cliente.findAll();
    res.json(clientes);
});
// GET /clientes/:id: devuelve un cliente específico por su ID
app.get("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    cliente ? res.json(cliente) : res.status(404).json({ message: "Cliente no encontrado" });
});
// POST /clientes: crea un nuevo cliente con los datos proporcionados en el body de la solicitud
app.post("/clientes", async (req, res) => {
    const { nombre, apellido, edad } = req.body;
    const nuevoCliente = await Cliente.create({ nombre, apellido, edad });
    res.json({ message: `Cliente ${nuevoCliente.nombre} agregado correctamente` });
});
// PATCH /clientes/:id: actualiza un cliente existente con los datos proporcionados en el body de la solicitud
app.patch("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
        await cliente.update(req.body);
        res.json(cliente);
    } else {
        res.status(404).json({ message: "Cliente no encontrado" });
    }
});
// DELETE /clientes/:id: elimina un cliente específico por su ID
app.delete("/clientes/:id", async (req, res) => {
    const eliminado = await Cliente.destroy({ where: { id: req.params.id } });
    eliminado
        ? res.json({ message: `Cliente con ID ${req.params.id} eliminado` })
        : res.status(404).json({ message: "Cliente no encontrado" });
});

// ------------------- CRUD MASCOTAS -------------------
// definimos las rutas para manejar las operaciones CRUD de mascotas
// GET /mascotas: devuelve una lista de todas las mascotas, incluyendo su cliente asociado
app.get("/mascotas", async (req, res) => {
    const mascotas = await Mascota.findAll({ include: Cliente });
    res.json(mascotas);
});
// GET /mascotas/:id: devuelve una mascota específica por su ID, incluyendo su cliente asociado
app.get("/mascotas/:id", async (req, res) => {
    const mascota = await Mascota.findByPk(req.params.id, { include: Cliente });
    mascota ? res.json(mascota) : res.status(404).json({ message: "Mascota no encontrada" });
});
// POST /mascotas: crea una nueva mascota con los datos proporcionados en el body de la solicitud, 
// incluyendo el ID del cliente al que pertenece
app.post("/mascotas", async (req, res) => {
    const { nombre, tipo, edad, peso, fechaNacimiento, vacunado, descripcion, ClienteId } = req.body;
    const nuevaMascota = await Mascota.create({ nombre, tipo, edad, peso, fechaNacimiento, vacunado, descripcion, ClienteId });
    res.json({ message: `Mascota ${nuevaMascota.nombre} agregada correctamente` });
});
// PATCH /mascotas/:id: actualiza una mascota existente con los datos proporcionados en el body de la solicitud
app.patch("/mascotas/:id", async (req, res) => {
    const mascota = await Mascota.findByPk(req.params.id);
    if (mascota) {
        await mascota.update(req.body);
        res.json(mascota);
    } else {
        res.status(404).json({ message: "Mascota no encontrada" });
    }
});
// DELETE /mascotas/:id: elimina una mascota específica por su ID
app.delete("/mascotas/:id", async (req, res) => {
    const eliminado = await Mascota.destroy({ where: { id: req.params.id } });
    eliminado
        ? res.json({ message: `Mascota con ID ${req.params.id} eliminada` })
        : res.status(404).json({ message: "Mascota no encontrada" });
});

// ------------------- PUERTO -------------------
app.listen(8000, () => {
    console.log("Servidor corriendo en http://localhost:8000");
});
