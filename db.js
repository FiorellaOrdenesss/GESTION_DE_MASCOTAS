// ------------------- db.js -------------------
// importamos Sequelize y definimos la conexión a la base de datos, así como los modelos Cliente y Mascota
// este archivo se encarga de configurar la conexión a la base de datos
const { Sequelize, Model, DataTypes } = require("sequelize");
// configuramos la conexión a la base de datos MySQL con los parámetros correspondientes
const sequelize = new Sequelize("gestion_de_mascotas", "root", "Tuviejaentanga12!", {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: false, // desactivamos los logs de Sequelize para evitar saturar la consola
    // Son mensajes que muestra Sequelize en la consola cada vez que ejecuta una consulta a la base de datos. 
    // Pueden ser útiles para depurar, pero también pueden ser molestos si se ejecutan muchas consultas.
});

// Modelo Cliente
// definimos el modelo Cliente con sus atributos y tipos de datos
// el modelo Cliente hereda de Model, lo que le permite interactuar con la base de datos a través de Sequelize
// model es una clase base que proporciona métodos para realizar --> 
// operaciones CRUD (Create, Read, Update, Delete) en la base de datos.
class Cliente extends Model { }
Cliente.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        edad: {
            type: DataTypes.INTEGER,
            validate: { min: 0 }
        }
    },
    { sequelize, modelName: "cliente" }
);

// Modelo Mascota
// definimos el modelo Mascota con sus atributos y tipos de datos
// el modelo Mascota también hereda de Model, 
// lo que le permite interactuar con la base de datos a través de Sequelize
// el modelo Mascota tiene una relación de pertenencia con el modelo Cliente, 
// lo que significa que cada mascota está asociada a un cliente específico
// seria una relacion N a 1, ya que un cliente puede tener muchas mascotas, 
// pero cada mascota solo pertenece a un cliente
class Mascota extends Model { }
Mascota.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        tipo: {
            type: DataTypes.STRING,
            validate: { isIn: [["perro", "gato", "ave", "otro"]] }
        },
        edad: {
            type: DataTypes.INTEGER,
            validate: { min: 0 }
        },
        peso: {
            type: DataTypes.FLOAT,
            validate: { min: 0.1 }
        },
        fechaNacimiento: DataTypes.DATEONLY,
        vacunado: { type: DataTypes.BOOLEAN, defaultValue: false },
        descripcion: DataTypes.TEXT
    },
    { sequelize, modelName: "mascota" }
);

// Relación: una mascota pertenece a un cliente
// definimos la relación entre los modelos Mascota y Cliente 
// utilizando los métodos belongsTo y hasMany de Sequelize
// belongsTo indica que cada mascota pertenece a un cliente, 
// y se especifica la clave foránea ClienteId
// hasMany indica que un cliente puede tener muchas mascotas, 
// y también se especifica la clave foránea ClienteId
Mascota.belongsTo(Cliente, { foreignKey: "ClienteId" });
Cliente.hasMany(Mascota, { foreignKey: "ClienteId" });

// exportamos la conexión a la base de datos y los modelos
// para que puedan ser utilizados en otros archivos
// en nuestro caso se exporta a index.js para manejar las rutas y operaciones CRUD
module.exports = { sequelize, Cliente, Mascota };
