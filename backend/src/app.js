const express = require('express');
const { productsRoutes, salesRoutes } = require('./routes');

const app = express();

app.use(express.json());
// bodyParser
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
