const router = require('express').Router();
const apiRoutes = require('./api');

/* home view */
router.get('/', (req, res) => {
  res.render('home-main', { layout: 'home' });
});

/* user registration view */
router.get('/register', (req, res) => {
  viewPage = () => 'register';
  res.render('register-main', { layout: 'register' });
});

/* login view */
router.get('/login', (req, res) => {
  res.render('login-main', { layout: 'login' });
});

/* forgot password view */
router.get('/password-reset', (req, res) => {
  res.render('password-reset-main', { layout: 'password-reset' });
});

/* dashboard view */
router.get('/dashboard', (req, res) => {
  res.render('dashboard-main', { layout: 'dashboard' });
});

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send('<h1>Wrong Route!</h1>');
});

module.exports = router;
