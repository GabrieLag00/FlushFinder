// envConfig.js en BackFlushFinder

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Subir un nivel para alcanzar el directorio FlushFinder donde se encuentra el .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
