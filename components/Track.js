import Image from "next/image";
import AudioPlayer from "./AudioPlayer";
import { getDateShort } from "@/utils";
import useAudioPlayer from "@/hooks/useAudioPlayer";

const getDefaultTrackName = (track) => track.title ?? "Recorded on " + getDateShort(track.createdAt)

const defaultTrackImage =
  "https://evenings.s3.us-east-2.amazonaws.com/images/1703883206523.png";

const Track = ({ track }) => {
  const { currentTime, duration, playing, setPlaying, setClickedTime, resetPlayer } =
    useAudioPlayer(`player_${track.id}`);

  return (
    <div className="flex w-full mb-3 bg-black/10 p-5 hover:bg-black/20 shadow-md border border-8 border-black/5 cursor-pointer rounded-sm" onClick={() => setPlaying(!playing)}>
      <div className="w-[85px] h-[85px] mr-5">
        <Image src={track.image ?? defaultTrackImage} alt={track.title} width={85} height={85} className="rounded-3xl object-cover h-[85px] border border-gray-500/10" />
      </div>
      <div className="flex flex-col flex-1">
        <div className="jacquard-24-regular text-xl mb-3">
        {getDefaultTrackName(track)}
        </div>
        <AudioPlayer track={track} currentTime={currentTime} duration={duration || track.duration} setClickedTime={setClickedTime} />
      </div>
    </div>
  );
};

export default Track;
