//index.js
import 'dotenv/config';
import app from './app.js';
import {connectDB} from './connect.js';
import {Server as WebsocketServer} from 'socket.io';
import http from 'http';


const server = http.createServer(app)
const httpServer = server.listen(4000);
const socketServer = server.listen(8655);
const io = new WebsocketServer(socketServer);
connectDB();


console.log('servidor de la base de datos iniciado en', 4000);

console.log('servidor de socket iniciado en', 8655);



