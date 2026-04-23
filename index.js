// ------------------- index.js -------------------
// Dependencias necesarias
const express = require("express");
const cors = require("cors");
const { sequelize, Cliente, Mascota } = require("./db");
const { Op } = require("sequelize");

// Configuración de Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sincronización de la base de datos
sequelize.sync().then(() => {
    console.log("Base de datos sincronizada");
});

// ------------------- CRUD CLIENTES -------------------

// GET /clientes (con filtros opcionales por nombre y apellido)
app.get("/clientes", async (req, res) => {
    const { nombre, apellido } = req.query;
    const where = {};
    if (nombre) where.nombre = nombre;
    if (apellido) where.apellido = apellido;
    const clientes = await Cliente.findAll({ where });
    res.json(clientes);
});

// GET /clientes/:id
app.get("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    cliente ? res.json(cliente) : res.status(404).json({ message: "Cliente no encontrado" });
});

// GET /clientes/:id/mascotas
app.get("/clientes/:id/mascotas", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id, { include: Mascota });
    cliente ? res.json(cliente) : res.status(404).json({ message: "Cliente no encontrado" });
});

// POST /clientes
app.post("/clientes", async (req, res) => {
    const { nombre, apellido, edad } = req.body;
    const nuevoCliente = await Cliente.create({ nombre, apellido, edad });
    res.json({ message: `Cliente ${nuevoCliente.nombre} agregado correctamente` });
});

// PATCH /clientes/:id
app.patch("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
        await cliente.update(req.body);
        res.json(cliente);
    } else {
        res.status(404).json({ message: "Cliente no encontrado" });
    }
});

// PUT /clientes/:id
app.put("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
        await cliente.update(req.body);
        res.json(cliente);
    } else {
        res.status(404).json({ message: "Cliente no encontrado" });
    }
});

// DELETE /clientes/:id
app.delete("/clientes/:id", async (req, res) => {
    const eliminado = await Cliente.destroy({ where: { id: req.params.id } });
    eliminado
        ? res.json({ message: `Cliente con ID ${req.params.id} eliminado` })
        : res.status(404).json({ message: "Cliente no encontrado" });
});

// ------------------- CRUD MASCOTAS -------------------

// GET /mascotas (con filtros opcionales por tipo, vacunado y rango de edad)
app.get("/mascotas", async (req, res) => {
    const { tipo, vacunado, edadMin, edadMax } = req.query;
    const where = {};
    if (tipo) where.tipo = tipo;
    if (vacunado) where.vacunado = vacunado === "true";
    if (edadMin) where.edad = { [Op.gte]: Number(edadMin) };
    if (edadMax) where.edad = { ...where.edad, [Op.lte]: Number(edadMax) };
    const mascotas = await Mascota.findAll({ where, include: Cliente });
    res.json(mascotas);
});

// GET /mascotas/:id
app.get("/mascotas/:id", async (req, res) => {
    const mascota = await Mascota.findByPk(req.params.id, { include: Cliente });
    mascota ? res.json(mascota) : res.status(404).json({ message: "Mascota no encontrada" });
});

// POST /mascotas
app.post("/mascotas", async (req, res) => {
    const { nombre, tipo, edad, peso, fechaNacimiento, vacunado, descripcion, ClienteId } = req.body;
    const nuevaMascota = await Mascota.create({ nombre, tipo, edad, peso, fechaNacimiento, vacunado, descripcion, ClienteId });
    res.json({ message: `Mascota ${nuevaMascota.nombre} agregada correctamente` });
});

// PATCH /mascotas/:id
app.patch("/mascotas/:id", async (req, res) => {
    const mascota = await Mascota.findByPk(req.params.id);
    if (mascota) {
        await mascota.update(req.body);
        res.json(mascota);
    } else {
        res.status(404).json({ message: "Mascota no encontrada" });
    }
});

// PUT /mascotas/:id
app.put("/mascotas/:id", async (req, res) => {
    const mascota = await Mascota.findByPk(req.params.id);
    if (mascota) {
        await mascota.update(req.body);
        res.json(mascota);
    } else {
        res.status(404).json({ message: "Mascota no encontrada" });
    }
});

// DELETE /mascotas/:id
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
