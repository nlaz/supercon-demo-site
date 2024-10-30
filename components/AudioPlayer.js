import { useRef } from "react";
import Bar from "./Bar";
import { getTrackDuration } from "@/utils";

const AudioPlayer = ({ track, currentTime, duration, setClickedTime }) => {
  const audioRef = useRef();
  return (
    <div>
      <div className="flex justify-between pixelify-sans-regular mb-3">
        <span className="text-sm">{getTrackDuration(currentTime)}</span>
        <span className="text-sm">{getTrackDuration(duration)}</span>
      </div>
      <div className="relative bg-black/30 rounded-md justify-between flex items-center h-[7px] w-full">
        <Bar currentTime={currentTime} duration={duration} setClickedTime={setClickedTime} />
      </div>
      <audio
        id={`player_${track.id}`}
        controls
        src={track.location}
        className="invisible hidden"
        ref={audioRef}
      />
    </div>
  )
};

export default AudioPlayer;
