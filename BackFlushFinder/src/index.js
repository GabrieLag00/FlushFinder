//index.js
import 'dotenv/config';
import app from './app.js';
import {connectDB} from './connect.js';

connectDB();

app.listen(4000);
console.log('servidor iniciado', 4000);



