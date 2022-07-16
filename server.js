const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const handlebars = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/',
    extname: 'hbs',
  })
);

// sync sequelize models to the database, then turn on the server
// sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);
// });
