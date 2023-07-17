const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// Route to get comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err); 
            res.status(500).json(err); 
        })
});

// Route to get 1 comment
router.get('/:id', (req, res) => {
    Comment.findAll({
            where: { 
                id: req.params.id}
        })
        .then(dbCommentData => res.json(dbCommentData))
        // Catch error and console log
        .catch(err => {
            console.log(err); 
            res.status(500).json(err); 
        })
});


// Route to update a comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
      },
      {
        where: {
          id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    // Catch error and console log
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Route to create a comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text, 
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    })
        .then(dbCommentData => res.json(dbCommentData))
        // Catch error and console log
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});


// Route to delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    // Catch error and console log
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;