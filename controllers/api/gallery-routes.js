const router = require('express').Router();
const { User, Gallery, Comment, Nft } = require('../../models');

//get all the galleries
router.get('/', (req, res) => {
  Gallery.findAll({
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbGalleryData) => {
      res.json(dbGalleryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get gallery by id
router.get('/:id', (req, res) => {
  Gallery.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  }) //include the galleries and comments of this user
    .then((dbGalleryData) => {
      if (!dbGalleryData) {
        res
          .status(404)
          .json({ message: 'No Gallery found with this id' });
        return;
      }
      res.json(dbGalleryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add gallery
router.post('/', (req, res) => {
  // This will make a new gallery
  // Expects Title, body, user_id
  Gallery.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id,
  })
    .then((dbGalleryData) => {
      res.json(dbGalleryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); //REST api needs status
    });
});
//update gallery
router.put('/:id', (req, res) => {
  console.log('The id is ', req.params.id);
  Post.update(
    {
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbGalleryData) => {
      if (!dbGalleryData) {
        res
          .status(404)
          .json({ message: 'No Gallery found with this id' });
        return;
      }
      res.json(dbGalleryData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
//remove Gallery
router.delete('/:id', (req, res) => {
  Gallery.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbGalleryData) => {
      if (!dbGalleryData) {
        res
          .status(404)
          .json({ message: 'No Gallery found with this id' });
        return;
      }
      res.json(dbGalleryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
