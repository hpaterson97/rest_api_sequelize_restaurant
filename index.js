//import the tables from the sequelize_connect file
const{connection, Restaurant, Menu, MenuItem} = require('./sequelize_connect');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());


//restuarants
app.post('/api/restaurants', async (req, res) => {
    try{ 
        //creating a row in the database using the sequelize create method
        const restaurant = await Restaurant.create(req.body); 
        //status 201 means you have created a resource
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/restaurants', async (req, res) => {
    try {
        if (req.query.sort_by){
            const restaurants = await Restaurant.findAll({
                order: [
                    [req.query.sort_by,
                    req.query.order_by]
                ]
            });
            res.status(200).send(restaurants);
        }
        else{
            const restaurants = await Restaurant.findAll({});
            res.status(200).send(restaurants);
        }

        
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/restaurants/:id', async (req, res) => {
    try {
        
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.params.id
            }
        });
    
            
        res.status(200).send(restaurant);
        }
    catch (e) {
        res.status(400).send(e.message);
    }
});



app.delete('/api/restaurants/:restaurant_id', async (req, res) => {
    try {
        const restaurant = await Restaurant.destroy({
            where: {id: req.params.restaurant_id}
        });

        res.status(200).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.put('/api/restaurants/:restaurant_id', async (req, res) => {
    try{
        const restaurant = await Restaurant.update(req.body, {
            where: {id: req.params.restaurant_id}
        })
        res.status(200).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});


//menus
app.post('/api/restaurants/:restaurant_id/menus', async (req, res) => {
    
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.params.restaurant_id
            }
        });
        const menu = await Menu.create(req.body);
        await restaurant.addMenu(menu);
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/restaurants/:restaurant_id/menus', async (req, res) => {
    try {
        const menus = await Menu.findAll({
            where: {
                RestaurantId: req.params.restaurant_id
            }
        });

        res.status(200).send(menus);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/restaurants/:restaurant_id/menus/:menu_id', async (req, res) => {
    try {
        const menus = await Menu.findOne({
            where: {id: req.params.menu_id}
        });

        res.status(200).send(menus);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.delete('/api/restaurants/:restaurant_id/menus/:menu_id', async (req, res) => {
    try {
        const menu = await Menu.destroy({
            where: {id: req.params.menu_id}
        });

        res.status(200).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.put('/api/restaurants/:restaurant_id/menus/:menu_id', async (req, res) => {
    try {
        const menu = await Menu.update(req.body, {
            where: {id: req.params.menu_id}
        });

        res.status(200).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});


//menu items
app.post('/api/menus/:menu_id/menuitems', async (req, res) => {
    try{ 
        const menu = await Menu.findOne({where: {id: req.params.menu_id}});
        const menuitem = await MenuItem.create(req.body);
        await menu.addMenuItem(menuitem);
        //creating a row in the database using the sequelize create method
        
        //status 201 means you have created a resource
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});


app.get('/api/menus/:menu_id/menuitems', async (req, res) => {
    try {
        const menuitems = await MenuItem.findAll({
            where: {
                MenuId: req.params.menu_id
            }
        });

        res.status(200).send(menuitems);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/menus/:menu_id/menuitems/:menuitem_id', async (req, res) => {
    try {
        const menuitem = await MenuItem.findOne({
            where: {id: req.params.menuitem_id}
        });

        res.status(200).send(menuitem);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.delete('/api/menus/:menu_id/menuitems/:menuitem_id', async (req, res) => {
    try {
        const menuitem = await MenuItem.destroy({
            where: {id: req.params.menuitem_id}
        });

        res.status(200).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

app.put('/api/menus/:menu_id/menuitems/:menuitem_id', async (req, res) => {
    try {
        const menuitem = await MenuItem.update(req.body, {
            where: {id: req.params.menuitem_id}
        });

        res.status(200).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});



//deletes all restaurants
app.delete('/api/restaurants', async (req, res) => { 
    try {
        await Restaurant.destroy({
            truncate: true
        });

        res.status(200).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
//deletes all menus
app.delete('/api/menus', async (req, res) => { 
    try {
        await Menu.destroy({
            truncate: true
        });

        res.status(200).send();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
//deletes all menu items
app.delete('/api/menuitems', async (req, res) => { 
    try {
        await MenuItem.destroy({
            truncate: true
        });

        res.status(200).send();
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