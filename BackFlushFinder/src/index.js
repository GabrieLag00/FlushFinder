//index.js
import 'dotenv/config';
import app from './app.js';
import {connectDB} from './connect.js';
import {Server as WebsocketServer} from 'socket.io'
import http from 'http'


const server = http.createServer(app)
const httpServer = server.listen(4000);
const io = new WebsocketServer(httpServer)
connectDB();


console.log('servidor iniciado', 4000);



