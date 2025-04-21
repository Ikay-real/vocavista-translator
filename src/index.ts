import express, { Express, Request, Response } from 'express';
// import noteRoutes from './routes/noteRoutes';

import path from 'path';
import translationRoutes from './routes/translationRoutes';
import config from './utils/config';
import usageRoutes from './routes/usageRoutes';


const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

console.log(
path.join(__dirname, 'public', 'index.html'));

// Use translation routes
app.use('/', translationRoutes); // Mount translation routes under the root path

// Use usage routes
app.use('/', usageRoutes); // Mount usage routes under the root path

// Basic error handling middleware (optional, but good practice)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`API Key authentication is enabled.`);
  console.log(`Using Gemini Model: ${config.geminiModel}`);
});



