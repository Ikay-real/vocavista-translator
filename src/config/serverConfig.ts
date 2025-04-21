// src/config/serverConfig.ts
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error(
    'ERROR: API_KEY environment variable is not set. Please define it in your .env file.',
  );
  process.exit(1); // Exit if critical config is missing
}

export const serverConfig = {
  port: PORT,
  apiKey: API_KEY,
};