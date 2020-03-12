const products = [
  {
    name: 'MacBook Pro 2019',
    description: 'Laptop from Apple',
    price: 2300.0,
  },
  {
    name: 'iPhone 11',
    description: 'Phone from Apple',
    price: 1200.0,
  },
  {
    name: 'Pixel 4a',
    description: 'Phone from Google',
    price: 300.0,
  },
];

exports.up = async function(sql) {
  console.log('Inserting products into product table...');

  await sql`
    INSERT INTO products ${sql(products, 'name', 'description', 'price')};
  `;
};

exports.down = async function(sql) {
  console.log('Deleting products from product table...');

  await sql`
    DELETE FROM products
      WHERE name in (${products.map(product => product.name)});
  `;
};
