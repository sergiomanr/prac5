'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
    'Attachments',    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        mime: {
            type: Sequelize.STRING,
            allowNull: true
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        image: {
            type: Sequelize.BLOB('long'),
            allowNull: true
        }
    },
        {
        sync: {force: true}
        }
    ); 
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Attachments');
    }
};