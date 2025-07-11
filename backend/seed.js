const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const seed = async () => {
  try {
    await pool.query(`
      INSERT INTO blogs (slug, title, content)
      VALUES 
        ('first-post', 'First Blog Post', 'This is the content of the first post.'),
        ('second-post', 'Another Blog Post', 'Here is some more blog content.'),
        ('hello-world', 'Hello World!', 'Welcome to the blog.');
    `);
  } catch (err) {
    console.error(' Failed to seed data:', err);
  } finally {
    await pool.end();
  }
};

seed();
