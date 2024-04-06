const {Model, Sequelize} = require('sequelize');
// Definition of the Quiz model:
module.exports = (sequelize) => {
 class Attachments extends Model {
 }
    Attachments.init({
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
    mime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    image: {
        type: Sequelize.BLOB,
        allowNull: true
    }
    }, {
        sequelize
    }
 );
 return Attachments;
};
