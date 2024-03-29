const router = require('express').Router();
const { User, Nft, Comment } = require('../../models');

//get all the comments
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: ['id', 'comment_text', 'user_id', 'nft_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
    ],
  }) //include the galleries and comments of this user
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get comment by id
router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'comment_text', 'user_id', 'nft_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
    ],
  }) //include the galleries and comments of this user
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res
          .status(404)
          .json({ message: 'No Comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add comment
router.post('/', (req, res) => {
  //expects comment_text, user_id, gallery_id
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    nft_id: req.body.nft_id,
  })
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); //REST api needs status
    });
});

//update comment
router.put('/', (req, res) => {
  res.send(`update comment`);
});

//remove comment
router.delete('/:id', (req, res) => {
  Nft.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res
          .status(404)
          .json({ message: 'No Comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
