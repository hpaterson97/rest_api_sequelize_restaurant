//similar to schema in sql

const Sequelize = require('sequelize'); //need the sequelize package

const restaurantModel = {
    name: {
        type: Sequelize.STRING, //TEXT in sql
        allowNull: false
    },
    imagelink: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

const menuModel = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

const menuItemModel = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
};

module.exports = {restaurantModel, menuModel, menuItemModel};