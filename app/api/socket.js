import { Server } from "socket.io";

export default function handler(req, res) {
    console.log(res.socket.server)
    if (!res.socket.server.io) {
        console.log("Starting socket.io server...");
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("User connected", socket.id);

            socket.on("addMessage", (elem) => {
                socket.broadcast.emit("addMessage", elem);
            });

            socket.on("setDone", (elem) => {
                socket.broadcast.emit("setDone", elem);
            });

            socket.on("disconnect", () => {
                console.log("User disconnected", socket.id);
            });
        });
    }
    res.end();
}