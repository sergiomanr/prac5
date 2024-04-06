const Sequelize = require('sequelize');

const url = process.env.DATABASE_URL || "sqlite:blog_p5.sqlite";
const sequelize = new Sequelize(url);
const Posts = require('./post')(sequelize);
const Attachments = require('./attachment')(sequelize);



// Posts.hasOne(Attachments, {
//     foreignKey: 'attachmentId',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// })
// Attachments.belongsTo(Posts)

Attachments.hasOne(Posts, {as: 'post', foreignKey: 'attachmentId'});
Posts.belongsTo(Attachments, {as: 'attachment', foreignKey: 'attachmentId'});

module.exports = sequelize;