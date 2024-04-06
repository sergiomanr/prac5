const {Model, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
 class Posts extends Model {
 }
    Posts.init({
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
    } 
    }, {
        sequelize
    }
 );
 return Posts;
};