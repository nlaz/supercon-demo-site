import { useEffect, useRef } from "react";

const LiveAudio = (props) => {
  const { src, playing, isLoading, setIsLoading } = props;
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    const handleError = (err) => {
      const audio = audioRef.current;
      console.error(audio.error.code, audio.error.message);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsLoading(false);
    };

    const handlePlaying = () => {
      setIsLoading(false);
    };

    if (audio) {
      audio.addEventListener("playing", handlePlaying);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("canplaythrough", handleCanPlayThrough);
      audio.addEventListener("error", handleError);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("playing", handlePlaying);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        audio.removeEventListener("error", handleError);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef, src]);

  useEffect(() => {
    if (playing && !isLoading) {
      setIsLoading(true);
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <audio src={src} ref={audioRef} className="invisible" preload="none">
      <source type="audio/mp3" src={src} />
    </audio>
  );
};

export default LiveAudio;
