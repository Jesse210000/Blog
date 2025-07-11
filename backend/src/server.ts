import express from 'express';
import pg from 'pg';
import cors from 'cors';
import blogRoutes from './routes/blog';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.set('db', pool);

app.use('/api/blogs', blogRoutes);

app.listen(3000, () => {
  console.log('Backend running at http://localhost:3000');
});
