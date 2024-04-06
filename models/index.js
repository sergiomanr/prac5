const Sequelize = require('sequelize');

const url = process.env.DATABASE_URL || "sqlite:blog_p5.sqlite";
const sequelize = new Sequelize(url, {logging: false});
const Posts = require('./post')(sequelize);
const Attachments = require('./attachment')(sequelize);

Attachments.hasOne(Posts, {as: 'post', foreignKey: 'attachmentId'});
Posts.belongsTo(Attachments, {as: 'attachment', foreignKey: 'attachmentId'});

module.exports = sequelize;