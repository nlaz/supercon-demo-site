import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socketio",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("reaction", (data) => {
        socket.broadcast.emit("reactionReceived", data);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }
  res.end();
};

export default ioHandler;
