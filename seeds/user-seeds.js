const { User } = require('../models');
const userData = [
  {
    username: 'griffondean',
    password: 'test1'
    
  },
  {
    username: 'griffdean',
    password: 'test2'
  },
  {
    username: 'gdawg',
    password: 'test3'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;