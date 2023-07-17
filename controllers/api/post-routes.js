const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET all posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      // Query configuration
        attributes: ['id', 
                    'title',
                    'content',
                    'created_at'
                    ],
        order: [['created_at', 'DESC']],          
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData.reverse()))
        // Catch error and console log
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  
});

// GET one post 
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 
                   'content',
                   'title',
                   'created_at'
                ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      // Catch error and console log
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Creating a post
router.post('/', withAuth, (req, res) => {
    // create 1 post
    Post.create({ 
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        // Catch error and console log
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
});



// Update post title
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    // Catch error and console log
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



// Delete post 
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
        // Catch error and console log
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;