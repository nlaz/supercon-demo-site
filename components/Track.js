import AudioPlayer from "./AudioPlayer";
import { getDateShort } from "@/utils";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import ImageViewer from "./ImageViewer";

const getDefaultTrackName = (track) => track.title ?? "Recorded on " + getDateShort(track.createdAt);

const Track = ({ track }) => {
  const { currentTime, duration, playing, setPlaying, setClickedTime, resetPlayer } = useAudioPlayer(`player_${track.id}`);

  return (
    <div
      className="flex items-center w-full mb-3 bg-black/10 p-5 hover:bg-black/20 shadow-md border border-8 border-black/5 cursor-pointer rounded-sm"
      onClick={() => setPlaying(!playing)}
    >
      <div className="w-[90px] h-[90px] mr-5">
        <ImageViewer image={track?.image} playing={playing} />
      </div>
      <div className="flex flex-col flex-1">
        <div className="jacquard-24-regular text-xl mb-3">{getDefaultTrackName(track)}</div>
        <AudioPlayer track={track} currentTime={currentTime} duration={duration || track.duration} setClickedTime={setClickedTime} />
      </div>
    </div>
  );
};

export default Track;
