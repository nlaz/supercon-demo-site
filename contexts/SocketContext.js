import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initSocket = async () => {
      await fetch("/api/socketio");
      const socketIo = io({
        path: "/api/socketio",
        addTrailingSlash: false
      });

      socketIo.on("connect", () => {
        console.log("Connected to Socket.IO");
        setIsConnected(true);
      });

      socketIo.on("disconnect", () => {
        console.log("Disconnected from Socket.IO");
        setIsConnected(false);
      });

      setSocket(socketIo);
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
