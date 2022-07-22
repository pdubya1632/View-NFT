const router = require('express').Router();
const { User, Nft, Comment } = require('../../models');

//get all the Nfts
router.get('/', (req, res) => {
  Nft.findAll({
    attributes: ['id', 'title', 'description', 'image_url', 'owner'],
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbNftData) => {
      res.json(dbNftData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get nft by id
router.get('/:id', (req, res) => {
  Nft.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'description', 'image_url'],
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  }) //include the posts and comments of this user
    .then((dbNftData) => {
      if (!dbNftData) {
        res
          .status(404)
          .json({ message: 'No Nfts found with this id' });
        return;
      }
      res.json(dbNftData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add nft
router.post('/', (req, res) => {
  // This will make new nft rows
  // Expects title, description, image_url
  Nft.bulkCreate(
    // title: req.body.title,
    // description: req.body.description,
    // image_url: req.body.image_url,
    // user_id: req.session.user_id,
    req.body.filterNfts
  )
    .then((dbNftData) => {
      res.json(dbNftData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); //REST api needs status
    });
});

//update post
router.put('/:id', (req, res) => {
  console.log('The id is ', req.params.id);
  Nft.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbNftData) => {
      if (!dbNftData) {
        res
          .status(404)
          .json({ message: 'No Nft found with this id' });
        return;
      }
      res.json(dbNftData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
//remove post
router.delete('/:id', (req, res) => {
  Nft.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbNftData) => {
      if (!dbNftData) {
        res
          .status(404)
          .json({ message: 'No Nft found with this id' });
        return;
      }
      res.json(dbNftData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
