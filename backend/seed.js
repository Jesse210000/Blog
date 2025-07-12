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
    const blogsResult = await pool.query(`
      INSERT INTO blogs (slug, title, content, image_url, created_at, character_count)
      VALUES 
        ('first-post', 'First Blog Post', 'This is the content of the first post.',
         'https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg',
         '2025-10-26', 6900),
        ('second-post', 'Another Blog Post', 'Here is some more blog content.',
         'https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg',
         '2025-10-26', 6900),
        ('hello-world', 'Hello World!', 'Welcome to the blog.',
         'https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg',
         '2025-10-26', 6900)
      RETURNING id, slug;
    `);
    const blogs = blogsResult.rows;

    const tagNames = ['javascript', 'nodejs', 'webdev', 'docker', 'blogging'];
    const tagResults = await Promise.all(
      tagNames.map(name => pool.query(
        `INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id, name`, [name]
      ))
    );

    const tags = (await pool.query(`SELECT * FROM tags`)).rows;
    const blogTagPairs = [
      { slug: 'first-post', tags: ['javascript', 'webdev'] },
      { slug: 'second-post', tags: ['nodejs', 'docker'] },
      { slug: 'hello-world', tags: ['blogging', 'javascript'] }
    ];

    for (const pair of blogTagPairs) {
      const blog = blogs.find(b => b.slug === pair.slug);
      if (!blog) continue;

      for (const tagName of pair.tags) {
        const tag = tags.find(t => t.name === tagName);
        if (tag) {
          await pool.query(
            `INSERT INTO blog_tags (blog_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [blog.id, tag.id]
          );
        }
      }
    }

    console.log('Seeded blogs, tags, and blog_tags successfully.');
  } catch (err) {
    console.error('Failed to seed data:', err);
  } finally {
    await pool.end();
  }
};

seed();
