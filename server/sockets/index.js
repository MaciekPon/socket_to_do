// import { Server, Socket } from 'socket.io';

const socketHandler = (socket, io) => {
    console.log('A user connected:', socket.id);

    socket.on("addMessage", (elem) => {
        socket.broadcast.emit("addMessage", elem);
    });

    socket.on("setDone", (elem) => {
        socket.broadcast.emit("setDone", elem);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
};

export default socketHandler;