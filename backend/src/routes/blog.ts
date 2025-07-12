import { Router } from 'express';
import { Pool } from 'pg';

const router = Router();


router.get('/', async (req, res) => {
  const pool = req.app.get('db');

  const result = await pool.query(`
    SELECT 
      b.id,
      b.slug,
      b.title,
      b.content,
      b.image_url,
      b.character_count,
      b.created_at,
      t.name as tag
    FROM blogs b
    LEFT JOIN blog_tags bt ON b.id = bt.blog_id
    LEFT JOIN tags t ON bt.tag_id = t.id
    ORDER BY b.created_at DESC
  `);

  const blogsMap = new Map();

  for (const row of result.rows) {
    if (!blogsMap.has(row.slug)) {
      blogsMap.set(row.slug, {
        id: row.id,
        slug: row.slug,
        title: row.title,
        content: row.content,
        imageUrl: row.image_url,
        characterCount: row.character_count,
        createdAt: row.created_at,
        tags: [],
      });
    }

    if (row.tag) {
      blogsMap.get(row.slug).tags.push(row.tag);
    }
  }

  const blogs = Array.from(blogsMap.values());
  res.json(blogs);
});

router.get('/:id', async (req, res) => {
  const pool = req.app.get('db') as Pool;
  const blogId = req.params.id;

  try {
    const result = await pool.query(`
      SELECT 
        b.id,
        b.slug,
        b.title,
        b.content,
        b.image_url,
        b.character_count,
        b.created_at,
        t.name as tag
      FROM blogs b
      LEFT JOIN blog_tags bt ON b.id = bt.blog_id
      LEFT JOIN tags t ON bt.tag_id = t.id
      WHERE b.slug = $1 OR b.id::text = $1
      ORDER BY b.created_at DESC
    `, [blogId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const firstRow = result.rows[0];

    const blogPost = {
      id: firstRow.id,
      slug: firstRow.slug,
      title: firstRow.title,
      content: firstRow.content,
      imageUrl: firstRow.image_url,
      characterCount: firstRow.character_count,
      createdAt: firstRow.created_at,
      tags: [] as string[],
    };

    for (const row of result.rows) {
      if (row.tag) blogPost.tags.push(row.tag);
    }

    res.json(blogPost);
  } catch (err) {
    console.error('Error fetching blog post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;

