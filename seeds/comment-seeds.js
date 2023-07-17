const { Comment } = require('../models');
const commentData = [
  {
    comment_text: "Very Nice",
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: "Useful information",
    user_id: 2,
    post_id: 2
  },
  {
    comment_text: "Fantastic",
    user_id: 3,
    post_id: 3
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;