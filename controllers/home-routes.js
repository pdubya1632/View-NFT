const router = require('express').Router();
const { User, Nft, Comment } = require('../models');
const sequelize = require('../config/connection');

/* home view */
router.get('/', (req, res) => {
  res.render('home-main', {
    layout: 'home',
    loggedIn: req.session.loggedIn,
  });
});

/* user registration view */
router.get('/register', (req, res) => {
  viewPage = () => 'register';
  res.render('register-main', { layout: 'register' });
});

/* forgot password view */
router.get('/password-reset', (req, res) => {
  res.render('password-reset-main', { layout: 'password-reset' });
});

/* nft detail dashboard view */
/* route should be changed to /dashboard/nft/:id */
router.get('/dashboard/nft/', (req, res) => {
  res.render('nftDetail-main', {
    layout: 'dashboard',
    loggedIn: req.session.loggedIn,
  });
});

//serve up the single gallery page
router.get('/viewnft/:id', (req, res) => {
  //we need to get all galleries
  Nft.findOne({
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
      if (!dbGalleryData) {
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
router.get('/login', (req, res) => {
  console.log('Is logged in?', req.session.loggedIn);
  res.render('login-main', {
    layout: 'login',
    loggedIn: req.session.loggedIn,
  });
});

/* dashboard view */
router.get('/dashboard', (req, res) => {
  res.render('dashboard-main', {
    layout: 'dashboard',
    userId: req.session.user_id,
  });
});

router.get('/dashboard/collection/nft/:id', (req, res) => {
  res.render('nftDetail-main', {
    layout: 'dashboard',
    userId: req.session.user_id,
  });
});

// router.get('/gallery', (req, res) => {
//   res.render('create-gallery', { loggedIn: req.session.loggedIn });
// });

//load the edit page
router.get('/edit/:id', (req, res) => {
  //    gallery_id: req.galleryID,
  res.render('edit-gallery', {
    loggedIn: req.session.loggedIn,
    gallery_id: req.params.id,
  });
});

module.exports = router;
