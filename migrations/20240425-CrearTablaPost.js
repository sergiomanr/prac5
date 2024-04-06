'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
    'Posts',    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        attachmentId: {
            type: Sequelize.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            references: {
                model: "Attachments",
                key: "id"
            },
        } 
    },
        {
        sync: {force: true}
        }
    );
    },
    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
    }
};