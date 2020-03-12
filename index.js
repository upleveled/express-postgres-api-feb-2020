// Retrieve config from .env file
require('dotenv').config();

// Require necessary dependencies
const express = require('express');
const postgres = require('postgres');
const {
  generateProductLink,
  generateSingleProductInformation,
} = require('./utils');

// Create an Express app
const app = express();
const port = 3000;

// Connect to PostgreSQL
//
// Host, user, password and database are read from the .env file.
//
// If we wanted to configure this manually, we would do this:
// const sql = postgres(
//   `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,
// );
const sql = postgres();

// Create a new route handler that will get called
// when the user visits http://localhost:3000/products
app.get('/products', async (req, res) => {
  // Get the id from the URL query string
  // Eg. http://localhost:3000/products?id=1
  const productId = Number(req.query.id);

  // Compare original value against undefined before
  // it has been casted to a number.
  if (req.query.id === undefined) {
    // Select all products from the `product` table
    const products = await sql`
      SELECT * FROM products;
    `;

    // Respond in the browser with a list of products
    res.send(products.map(generateProductLink).join('<br />'));
  } else if (Object.is(productId, NaN)) {
    // If productId is NaN (Not a Number), then respond
    // with a message as such.
    res.send('Error: Product ID needs to be a number.');
  } else {
    // Select a single product
    const singleProductList = await sql`
      SELECT * FROM products WHERE id = ${productId};
    `;

    // If the array is empty, then return a message
    // that the product was not found.
    if (singleProductList.length === 0) {
      res.send('Product not found.');
    } else {
      // Respond in the browser with a single product
      res.send(
        singleProductList.map(generateSingleProductInformation).join('<br />'),
      );
    }
  }
});

// Start server on port
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`),
);
