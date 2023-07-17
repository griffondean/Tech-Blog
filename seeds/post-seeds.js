const { Post } = require('../models');
const postData = [
  {
    title: 'Sequelize.',
    content: 'I have really loved learning about sequelize.',
    user_id: 1
    
  },
  {
    title: 'How is MVC useful?',
    content: 'MVC allows developers to maintain true separation of concerns with the use of handlebars.',
    user_id: 2
  },
  {
    title: 'Authentication vs. Authorization',
    content: 'The is a difference where authentication is confirming your own identity whereas authorization means being allowed access to system.',
    user_id: 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;