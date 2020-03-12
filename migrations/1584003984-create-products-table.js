exports.up = async function(sql) {
  console.log('Creating products table...');
  await sql`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL NOT NULL
    );
  `;
};

exports.down = async function(sql) {
  console.log('Dropping products table...');
  await sql`
    DROP TABLE products;
  `;
};
