import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const pool = req.app.get('db');
  const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const pool = req.app.get('db');
  const { slug, title, content } = req.body;
  await pool.query(
    'INSERT INTO blogs (slug, title, content) VALUES ($1, $2, $3)',
    [slug, title, content]
  );
  res.status(201).send({ success: true });
});

export default router;
