const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//inicializamos nuestro servicio
const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(morgan());
app.use(express.json())

//definimos nuestras routes

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Hola estas accediendo a la super api del profe Ale!"
    })
});

const listUser = [
    {
        id: 1,
        name: 'Pedro',
        lastname: 'Di luca',
        age: 20,
        hincha: 'Pincha',
        role: 'ADMIN'
    },
    {
        id: 2,
        name: 'Eze',
        lastname: 'Lopez',
        age: 62,
        hincha: 'Chacarita',
        role: 'USER'
    },
    {
        id: 3,
        name: 'Marina',
        lastname: 'Martinez',
        age: 18,
        hincha: 'Cipolletti',
        role: 'USER'
    }
]

app.get('/users', (req, res) => {
    res.json({
        ok: true,
        listUser
    })
})
app.get('/users/find/id', (req, res) => {
    const { query } = req;
    const { id } = query;

    const result = listUser.find((user) => {
        return user.id == 1
    });

    if (result) {
        res.status(200).json({
            ok: true,
            result
        })
    }
    else {
        res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        })
    }
})

app.get('/user/find', (req, res) => {
    console.log("Buscando!");
    const { query } = req;
    console.log(query);
    /*const name = query.name;
    const lastname = query.lastname;*/
    const { name, lastname } = query;

    const result = listUser.find((user) => user.name === name && user.lastname === lastname)

    if (result) {
        res.status(200).json({
            ok: true,
            result
        })
    } else {
        res.status(404).json({
            ok: false,
            msg: 'No se encontraron resultados!!'
        })
    }


})

//Crear nuevo usuario:
app.post('/users/create', (req, res) => {
    //
    const { name, lastname, age, hincha, role } = req.body;

    //listUser.push(req.body);
    //listUser = [... listUser, req.body]
    //listUser.push({... req.body, name: 'Ana'})
    //listUser = [... listUser, {... req.body, name: 'Ana'}]

    const id = listUser[listUser.length - 1].id + 1;

    const newUser = { ...req.body, id }

    listUser.push(newUser);

    res.status(201).json({
        ok: true,
        msg: "Usuario agregado con Exito!",
        newUser
    })

})

app.put("/users/edit/", (req, res) => {
    const id = req.query.id;
    const newData = req.body;

    const posUser = listUser.findIndex((user) => user.id == id);

    if (posUser < 0) res.status(404).json({
        ok: false,
        msg: `No existe el usuario con id: ${id}`
    })

    listUser[posUser] = {... listUser[posUser], ... newData}
    //listUser[posUser] = {... newData, id};

    res.status(200).json({
        ok:true,
        user: listUser[posUser]
    })

})

//escuhamos en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});


