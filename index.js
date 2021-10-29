//import the tables from the sequelize_connect file
const{connection, Restaurant, Menu, MenuItem} = require('./sequelize_connect');

const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

app.post('/api/restaurants', async (req, res) => {
    try{ 
        //creating a row in the database using the sequelize create method
        const restaurant = await Restaurant.create(req.body); 
        //status 201 means you have created a resource
        res.status(201).send(restaurant);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({});

        res.status(200).send(restaurants);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.delete('/api/restaurants/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.destroy({
            where: {id: id}
        });

        res.status(200).send(restaurant);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});









//synchronising all models with database
async function start() {
    await connection.sync({
        logging: false,
    });
}

//run start and log any errors
start()
    .then(() => console.log('Sequelize connected'))
    .catch((e) => console.log(`caught error: ${e}`));

app.listen(port, () => console.log(`Express server running on port ${port}`));