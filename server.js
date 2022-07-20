const express = require('express');
const path = require('path');

//paths
const controller = require('./controllers');

//handlebars
const exphbs = require('express-handlebars');

//sequelize
const sequelize = require('./config/connection');

//session
const session = require('express-session');
const SequlizeStore = require('connect-session-sequelize')(
  session.Store
);

//set up the actual session
const sess = {
  secret: 'super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequlizeStore({
    db: sequelize,
  }),
};
//initialize the server
const app = express();
const PORT = process.env.PORT || 3001;

//middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

//use controllers
app.use('/', controller);

app.set('view engine', 'hbs');

app.engine(
  'hbs',
  exphbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/',
    extname: 'hbs',
  })
);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
