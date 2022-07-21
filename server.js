const express = require('express');
const path = require('path');

//paths
const controller = require('./controllers');

//handlebars
const exphbs = require('express-handlebars');
// const helpers = require('./utils/helpers');

//sequelize
const sequelize = require('./config/connection');

//initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

//session
const session = require('express-session');
const SequlizeStore = require('connect-session-sequelize')(
  session.Store
);

//set up the actual session
const sess = {
  secret: 'super secret secret',
  cookie: {
    // Stored in milliseconds (86400 === 1 day)
    maxAge: 86400,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequlizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//use controllers
app.use('/', controller);

// const hbs = exphbs.create({ helpers });

app.engine(
  'hbs',
  exphbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
  })
);

app.set('view engine', 'hbs');

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
