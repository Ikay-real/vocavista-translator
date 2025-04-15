import express, { Request, Response } from 'express';
import noteRoutes from './routes/noteRoutes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
//app.use(apiKeyMiddleware);

app.use('/notes', noteRoutes);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

console.log(
path.join(__dirname, 'public', 'index.html'));

app.listen(PORT, () => {

  console.log(`Server is running on port http://localhost:${PORT}`);
});
