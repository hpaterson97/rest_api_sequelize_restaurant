//similar to schema in sql

const Sequelize = require('sequelize'); //need the sequelize package

const restaurantModel = {
    name: {
        type: Sequelize.STRING, //TEXT in sql
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter restaurant name'
            },
            notEmpty: {
                msg: 'Please enter valid name'
            },
        }
    },
    imagelink: {
        type: Sequelize.STRING,
        allowNull: false,
    }
};

const menuModel = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter menu name'
            },
            notEmpty: {
                msg: 'Please enter valid name'
            },
        }
    }
};

const menuItemModel = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter menu item name'
            },
            notEmpty: {
                msg: 'Please enter valid name'
            },
        }
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true
        }
    }
};

module.exports = {restaurantModel, menuModel, menuItemModel};