// Retrieve config from .env file
require('dotenv').config();

// Require necessary dependencies
const express = require('express');
const postgres = require('postgres');

// Create an Express app
const app = express();
const port = 3000;

// Connect to PostgreSQL with username and password
const sql = postgres(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_DATABASE}`,
);

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
      SELECT * FROM product;
    `;

    // Respond in the browser with a list of products
    res.send(
      products.map(product => product.id + ': ' + product.name).join('<br />'),
    );
  } else if (Object.is(productId, NaN)) {
    // If productId is NaN (Not a Number), then respond
    // with a message as such.
    res.send('Error: Product ID needs to be a number.');
  } else {
    // Select a single product
    const singleProductList = await sql`
      SELECT * FROM product WHERE id = ${productId};
    `;

    // If the array is empty, then return a message
    // that the product was not found.
    if (singleProductList.length === 0) {
      res.send('Product not found.');
    } else {
      // Respond in the browser with a single product
      res.send(
        singleProductList
          .map(product => product.id + ': ' + product.name)
          .join('<br />'),
      );
    }
  }
});

// Start server on port
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}!`),
);
