const { sequelize, Cliente, Mascota } = require("./db");
async function seed() {
    await sequelize.sync({ force: true });

    const clientes = await Cliente.bulkCreate([
        { nombre: "Juan", apellido: "Pérez", edad: 30 },
        { nombre: "Ana", apellido: "García", edad: 25 },
        { nombre: "Luis", apellido: "Martínez", edad: 40 },
        { nombre: "María", apellido: "Rodríguez", edad: 35 },
        { nombre: "Pedro", apellido: "López", edad: 28 }
    ]);

    await Mascota.bulkCreate([
        { nombre: "Firulais", tipo: "perro", edad: 3, peso: 12, fechaNacimiento: "2021-03-15", vacunado: true, descripcion: "Perro juguetón", ClienteId: clientes[0].id },
        { nombre: "Michi", tipo: "gato", edad: 2, peso: 5, fechaNacimiento: "2022-05-10", vacunado: false, descripcion: "Gato curioso", ClienteId: clientes[1].id },
        { nombre: "Piolín", tipo: "ave", edad: 1, peso: 0.3, fechaNacimiento: "2023-01-20", vacunado: true, descripcion: "Canario amarillo", ClienteId: clientes[2].id },
        { nombre: "Rocky", tipo: "perro", edad: 4, peso: 20, fechaNacimiento: "2020-07-02", vacunado: true, descripcion: "Perro guardián", ClienteId: clientes[3].id },
        { nombre: "Nube", tipo: "gato", edad: 5, peso: 6, fechaNacimiento: "2019-11-11", vacunado: false, descripcion: "Gata tranquila", ClienteId: clientes[4].id },
        { nombre: "Toby", tipo: "perro", edad: 2, peso: 10, fechaNacimiento: "2022-09-01", vacunado: true, descripcion: "Cachorro activo", ClienteId: clientes[0].id },
        { nombre: "Luna", tipo: "gato", edad: 3, peso: 4.5, fechaNacimiento: "2021-12-25", vacunado: true, descripcion: "Gata mimosa", ClienteId: clientes[1].id },
        { nombre: "Coco", tipo: "ave", edad: 2, peso: 0.5, fechaNacimiento: "2022-06-18", vacunado: false, descripcion: "Loro parlanchín", ClienteId: clientes[2].id },
        { nombre: "Max", tipo: "perro", edad: 6, peso: 25, fechaNacimiento: "2018-04-30", vacunado: true, descripcion: "Perro veterano", ClienteId: clientes[3].id },
        { nombre: "Bella", tipo: "gato", edad: 1, peso: 3, fechaNacimiento: "2023-08-12", vacunado: false, descripcion: "Gatita juguetona", ClienteId: clientes[4].id }
    ]);
    console.log("Datos iniciales cargados");
}

seed();
