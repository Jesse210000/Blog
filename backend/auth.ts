import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from  'jsonwebtoken';

const router = Router();

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;
const JWT_SECRET = process.env.JWT_SECRET!;

router.post('/login', async (req, res) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ error: 'Password required' });

  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!valid) return res.status(401).json({ error: 'Unauthorized' });

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
