<<<<<<< HEAD
// Fiorella Ordenes y Facundo Alonzo
// ------------------- index.js -------------------
// declaramos las dependencias necesarias para el proyecto
// importamos Express para crear el servidor web y manejar las rutas
// sequelize es la instancia de conexión a la base de datos,
// mientras que Cliente y Mascota son los modelos que representan las tablas correspondientes en la base de datos
const express = require("express");
// importamos cors para permitir la comunicación entre el frontend y el backend
const cors = require("cors");

// importamos sequelize y los modelos Cliente y Mascota desde el archivo db.js
const { sequelize, Cliente, Mascota } = require("./db");
const { Op } = require("sequelize");

// creamos una instancia de Express y configuramos los middlewares
const app = express();
// habilitamos cors para permitir requests desde otros puertos, como el frontend en React
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

=======
// ------------------- index.js -------------------
// declaramos las dependencias necesarias para el proyecto
// importamos Express para crear el servidor web y manejar las rutas
// sequelize es la instancia de conexión a la base de datos, 
// mientras que Cliente y Mascota son los modelos que representan las tablas correspondientes en la base de datos
const express = require("express");
// importamos sequelize y los modelos Cliente y Mascota desde el archivo db.js
const { sequelize, Cliente, Mascota } = require("./db");
const { Op } = require("sequelize"); // Ni la mas palida idea, preguntar al profe
// creamos una instancia de Express y configuramos el middleware para parsear JSON
const app = express();
app.use(express.json());
>>>>>>> 5541a36884d1b982a60410311617c0c43e4e1c14
// sincronizamos la base de datos y mostramos un mensaje en la consola cuando esté lista
sequelize.sync().then(() => {
    console.log("Base de datos sincronizada");
});

// ------------------- CRUD CLIENTES -------------------
// definimos las rutas para manejar las operaciones CRUD de clientes
// CRUD: Create, Read, Update, Delete
<<<<<<< HEAD

// GET /clientes
// GET /clientes?nombre=Juan
// GET /clientes?apellido=Pérez
app.get("/clientes", async (req, res) => {
    const { nombre, apellido } = req.query;
    const where = {};

    if (nombre) where.nombre = nombre;
    if (apellido) where.apellido = apellido;

=======
// GET /clientes: devuelve una lista de todos los clientes
// GET /clientes?nombre=Juan
// Aca agregue la posibilidad de filtrar por nombre y apellido, 
// para que sea mas facil encontrar un cliente específico
// Se probaron las siguientes rutas:
// http://localhost:8000/clientes?nombre=Juan
// http://localhost:8000/clientes?apellido=Pérez
app.get("/clientes", async (req, res) => {
    const { nombre, apellido } = req.query;
    const where = {};
    if (nombre) where.nombre = nombre;
    if (apellido) where.apellido = apellido;
>>>>>>> 5541a36884d1b982a60410311617c0c43e4e1c14
    const clientes = await Cliente.findAll({ where });
    res.json(clientes);
});

<<<<<<< HEAD
// GET /clientes/:id
app.get("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    cliente
        ? res.json(cliente)
        : res.status(404).json({ message: "Cliente no encontrado" });
});

// GET /clientes/:id/mascotas
// esta ruta devuelve todas las mascotas asociadas a un cliente específico por su ID
app.get("/clientes/:id/mascotas", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id, { include: Mascota });
    cliente
        ? res.json(cliente)
        : res.status(404).json({ message: "Cliente no encontrado" });
});

// POST /clientes
=======
// GET /mascotas?tipo=perro&vacunado=true
// Aca agregue la posibilidad de filtrar por tipo de mascota, 
// si está vacunada o no, y por rango de edad (edadMin y edadMax)
// Se probaron las siguientes rutas:
// http://localhost:8000/mascotas?tipo=perro
// http://localhost:8000/mascotas?vacunado=true
// http://localhost:8000/mascotas?edadMin=2
// http://localhost:8000/mascotas?edadMax=4
// http://localhost:8000/mascotas?edadMin=2&edadMax=4
app.get("/mascotas", async (req, res) => {
    const { tipo, vacunado, edadMin, edadMax } = req.query;
    const where = {};
    if (tipo) where.tipo = tipo;
    if (vacunado) where.vacunado = vacunado === "true";
    if (edadMin) where.edad = { [Op.gte]: edadMin };
    if (edadMax) where.edad = { ...where.edad, [Op.lte]: edadMax };
    const mascotas = await Mascota.findAll({ where, include: Cliente });
    res.json(mascotas);
});
// GET /clientes/:id/mascotas
// esta ruta devuelve todas las mascotas asociadas a un cliente específico por su ID
// se probó la siguiente ruta:
// http://localhost:8000/clientes/1/mascotas
app.get("/clientes/:id/mascotas", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id, { include: Mascota });
    cliente ? res.json(cliente) : res.status(404).json({ message: "Cliente no encontrado" });
});

// POST /clientes: crea un nuevo cliente con los datos proporcionados en el body de la solicitud
// el body debe contener los campos nombre, apellido y edad para crear un nuevo cliente
// se probó la siguiente ruta con el siguiente body:
// http://localhost:8000/clientes
// {
//     "nombre": "Sofía",
//     "apellido": "González",
//     "edad": 25
// }

>>>>>>> 5541a36884d1b982a60410311617c0c43e4e1c14
app.post("/clientes", async (req, res) => {
    const { nombre, apellido, edad } = req.body;
    const nuevoCliente = await Cliente.create({ nombre, apellido, edad });
    res.json({ message: `Cliente ${nuevoCliente.nombre} agregado correctamente` });
});
<<<<<<< HEAD

// PATCH /clientes/:id
app.patch("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);

=======
// PATCH /clientes/:id: actualiza un cliente existente con los datos proporcionados en el body de la solicitud
// el body puede contener cualquiera de los campos nombre, apellido o edad para actualizar el cliente
// se probó la siguiente ruta con el siguiente body:
// http://localhost:8000/clientes/1 
// {
//     "edad": 31
// }
app.patch("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
>>>>>>> 5541a36884d1b982a60410311617c0c43e4e1c14
    if (cliente) {
        await cliente.update(req.body);
        res.json(cliente);
    } else {
        res.status(404).json({ message: "Cliente no encontrado" });
    }
});
<<<<<<< HEAD

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

=======
// DELETE /clientes/:id: elimina un cliente específico por su ID
// se probó la siguiente ruta:
// http://localhost:8000/clientes/7
app.delete("/clientes/:id", async (req, res) => {
    const eliminado = await Cliente.destroy({ where: { id: req.params.id } });
>>>>>>> 5541a36884d1b982a60410311617c0c43e4e1c14
    eliminado
        ? res.json({ message: `Cliente con ID ${req.params.id} eliminado` })
        : res.status(404).json({ message: "Cliente no encontrado" });
});

// ------------------- CRUD MASCOTAS -------------------
<<<<<<< HEAD
// GET /mascotas
// GET /mascotas?tipo=perro
// GET /mascotas?vacunado=true
// GET /mascotas?edadMin=2
// GET /mascotas?edadMax=4
// GET /mascotas?edadMin=2&edadMax=4
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

    mascota
        ? res.json(mascota)
        : res.status(404).json({ message: "Mascota no encontrada" });
});

// POST /mascotas
app.post("/mascotas", async (req, res) => {
    const {
        nombre,
        tipo,
        edad,
        peso,
        fechaNacimiento,
        vacunado,
        descripcion,
        ClienteId
    } = req.body;

    const nuevaMascota = await Mascota.create({
        nombre,
        tipo,
        edad,
        peso,
        fechaNacimiento,
        vacunado,
        descripcion,
        ClienteId
    });

    res.json({ message: `Mascota ${nuevaMascota.nombre} agregada correctamente` });
});

// PATCH /mascotas/:id
app.patch("/mascotas/:id", async (req, res) => {
    const mascota = await Mascota.findByPk(req.params.id);

=======
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
>>>>>>> 5541a36884d1b982a60410311617c0c43e4e1c14
    if (mascota) {
        await mascota.update(req.body);
        res.json(mascota);
    } else {
        res.status(404).json({ message: "Mascota no encontrada" });
    }
});
<<<<<<< HEAD

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

=======
// DELETE /mascotas/:id: elimina una mascota específica por su ID
app.delete("/mascotas/:id", async (req, res) => {
    const eliminado = await Mascota.destroy({ where: { id: req.params.id } });
>>>>>>> 5541a36884d1b982a60410311617c0c43e4e1c14
    eliminado
        ? res.json({ message: `Mascota con ID ${req.params.id} eliminada` })
        : res.status(404).json({ message: "Mascota no encontrada" });
});

// ------------------- PUERTO -------------------
app.listen(8000, () => {
    console.log("Servidor corriendo en http://localhost:8000");
<<<<<<< HEAD
});
=======
});
>>>>>>> 5541a36884d1b982a60410311617c0c43e4e1c14
