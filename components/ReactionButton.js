import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../contexts/SocketContext";
import EmojiConfetti from "./EmojiConfetti";

const ReactionButton = () => {
  const { socket, isConnected } = useSocket();
  const [showEffect, setShowEffect] = useState(false);
  const [globalClickTimes, setGlobalClickTimes] = useState([]);
  const [clickIntensity, setClickIntensity] = useState(0);

  useEffect(() => {
    if (!socket) return;

    // Listen for reactions from other clients
    socket.on("reactionReceived", (data) => {
      setGlobalClickTimes((prevTimes) => {
        const newTimes = [...prevTimes, data.timestamp];
        // Keep only last 5 seconds of clicks
        const cutoffTime = Date.now() - 5000;
        return newTimes.filter((time) => time > cutoffTime);
      });

      setShowEffect(true);
      setTimeout(() => setShowEffect(false), 1000);
    });

    // Clean up socket listener
    return () => {
      socket?.off("reactionReceived");
    };
  }, [socket]);

  // Calculate click intensity based on global clicks
  useEffect(() => {
    const calculateIntensity = () => {
      const now = Date.now();
      const recentClicks = globalClickTimes.filter((time) => now - time < 2000);

      // Calculate intensity based on number of clicks in last 2 seconds
      const intensity = recentClicks.length;
      setClickIntensity(intensity);
    };

    // Update intensity whenever global clicks change
    calculateIntensity();

    // Clean up old clicks periodically
    const cleanup = setInterval(() => {
      setGlobalClickTimes((prevTimes) => {
        const cutoffTime = Date.now() - 5000;
        return prevTimes.filter((time) => time > cutoffTime);
      });
    }, 1000);

    return () => clearInterval(cleanup);
  }, [globalClickTimes]);

  const handleClick = () => {
    if (!socket) return;

    const timestamp = Date.now();

    // Emit the click event to all clients
    socket.emit("reaction", {
      timestamp,
    });

    // Add click to local state (the socket event will handle adding it back)
    setGlobalClickTimes((prev) => [...prev, timestamp]);

    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 1000);
  };

  return (
    <>
      <EmojiConfetti isActive={showEffect} clickIntensity={clickIntensity} />
      <div className="fixed bottom-16 right-20 flex flex-col items-center gap-2">
        <button
          onClick={handleClick}
          disabled={!isConnected}
          className={`text-3xl z-50 px-4 py-2 rounded-full bg-[#211324] ring-none outline-none active:translate-y-1 active:bg-[#100D11] shadow-lg shadow-black/40 flex items-center justify-center w-[85px] h-[85px] text-white
            ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          👏
        </button>
      </div>
    </>
  );
};

export default ReactionButton;
