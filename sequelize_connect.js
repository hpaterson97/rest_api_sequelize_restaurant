const Sequelize = require('sequelize');

// import models

const {restaurantModel, menuModel, menuItemModel} = require('./models/models');

//connects the database on localhost
const connection = new Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database/db.sqlite'
});

//instances of the models - the names of the variables are the names of the tables
const Restaurant = connect.define('Restaurant', restaurantModel);
const Menu = connect.define('Menu', menuModel);
const MenuItem = connect.define('MenuItem', menuItemModel);


//defining the relationships between the tables

Menu.belongsTo(Restaurant); //a menu can only be related to one restaurant

MenuItem.belongsTo(Menu); //a menu item can only be on one menu

Restaurant.hasMany(Menu); //a restaurant has many menus

Menu.hasMany(MenuItem); //a menu has many menu items

module.exports = {connection, Restaurant, Menu, MenuItem};
