import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from "socket.io";
import socketHandler from './server/sockets/index.js';


const port = parseInt(process.env.PORT || '21541', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    })

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        socketHandler(socket, io);
    });


    httpServer.listen(port, () => {
        console.log(
            `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV
            }`
        );
    });
})