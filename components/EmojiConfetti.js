import { useState, useCallback, useEffect } from "react";

const EmojiConfetti = ({ isActive, clickIntensity }) => {
  const [emojis, setEmojis] = useState([]);
  const emojiList = ['🎃', '👻', '🦇', '🕷️', '🕸️', '💀', '🍬'];

  const createEmoji = useCallback(() => {
    return {
      id: Date.now() + Math.random(),
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      left: Math.random() * 100,
      rotation: Math.random() * 360,
      duration: 1 + Math.random() * 1.5,
      delay: Math.random() * 0.3
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // Scale emoji count based on global click intensity
    const emojisPerBurst = Math.min(Math.ceil(clickIntensity / 2), 12);

    // Create initial burst of emojis
    const newEmojis = Array(emojisPerBurst).fill(null).map(createEmoji);
    setEmojis(prev => [...prev, ...newEmojis]);

    // Add a follow-up burst for more intense reactions
    const timeout = setTimeout(() => {
      const additionalEmojis = Array(Math.floor(emojisPerBurst/2)).fill(null).map(createEmoji);
      setEmojis(prev => [...prev, ...additionalEmojis]);
    }, 100);

    return () => clearTimeout(timeout);
  }, [isActive, clickIntensity, createEmoji]);

  const removeEmoji = useCallback((id) => {
    setEmojis(prev => prev.filter(emoji => emoji.id !== id));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {emojis.map(({ id, emoji, left, rotation, duration, delay }) => (
        <div
          key={id}
          className="absolute top-0 text-2xl animate-emoji-fall"
          style={{
            left: `${left}%`,
            opacity: 0,
            '--emoji-duration': `${duration}s`,
            '--emoji-rotation': `${rotation}deg`,
            '--emoji-delay': `${delay}s`,
          }}
          onAnimationEnd={() => removeEmoji(id)}
        >
          {emoji}
        </div>
      ))}
      <style>{`
        @keyframes emojiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            transform: translateY(0) rotate(calc(var(--emoji-rotation) * 0.2));
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(600px) rotate(var(--emoji-rotation));
            opacity: 0;
          }
        }
        .animate-emoji-fall {
          animation: emojiFall var(--emoji-duration) cubic-bezier(0.44, 0.46, 0.45, 0.25) var(--emoji-delay) forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
};

export default EmojiConfetti;
