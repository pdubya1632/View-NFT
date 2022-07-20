const router = require('express').Router();
const { User, Gallery, Nft, Comment } = require('../models');
const sequelize = require('../config/connection');

//home route server homepage
router.get('/', (req, res) => {
  //we need to get all galleries
  Gallery.findAll({
    attributes: ['id', 'body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbGalleryData) => {
      //serialize data
      if (!dbGalleryData) {
        res.status(404).json({ message: 'No Galleries Available' });
        return;
      }
      const galleries = dbGalleryData.map((gallery) =>
        gallery.get({ plain: true })
      ); // serialize all the galleries
      console.log(galleries);
      res.render('home', {
        galleries,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//serve up the single gallery page
router.get('/viewgallery/:id', (req, res) => {
  //we need to get all galleries
  Gallery.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username'],
          },
        ],
      },
    ],
  })
    .then((dbGalleryData) => {
      //serialize data
      if (!dbGalleryyData) {
        res.status(404).json({ message: 'No Galleries Available' });
        return;
      }
      const gallery = dbGalleryData.get({ plain: true }); // serialize all the galleries
      console.log(gallery);
      const myGallery = gallery.user_id == req.session.user_id;
      res.render('single-gallery', {
        gallery,
        loggedIn: req.session.loggedIn,
        currentUser: myGallery,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//serve up the login page
router.get('/login-main', (req, res) => {
  console.log('Is logged in?', req.session.loggedIn);
  res.render('login', { loggedIn: req.session.loggedIn });
});

//serve up the dashboard
router.get('/dashboard-main', (req, res) => {
  //we need to get all galleries
  console.log(req.session.user_id, ' this is the session id');
  Gallery.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'body', 'user_id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username'],
          },
        ],
      },
    ],
  })
    .then((dbGalleryData) => {
      //serialize data
      if (!dbgalleryData) {
        res.status(404).json({ message: 'No Galleries Available' });
        return;
      }
      const galleries = dbGalleryData.map((gallery) =>
        gallery.get({ plain: true })
      ); // serialize all the galleries
      console.log(galleries);
      res.render('dashboard', {
        galleries,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/gallery', (req, res) => {
  res.render('create-gallery', { loggedIn: req.session.loggedIn });
});
//load the edit page
router.get('/edit/:id', (req, res) => {
  //    gallery_id: req.galleryID,
  res.render('edit-gallery', {
    loggedIn: req.session.loggedIn,
    gallery_id: req.params.id,
  });
});
module.exports = router;
