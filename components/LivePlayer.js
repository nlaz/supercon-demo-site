import Image from "next/image";
import cx from "clsx";
import LiveAudio from "./LiveAudio";
import { useState } from "react";

const defaultTrackImage =
  "https://evenings.s3.us-east-2.amazonaws.com/images/1703883206523.png";

const OnAir = (props) => (
  <div
    className={cx("h-[14px] w-[14px] bg-orange-500 mr-3", {
      "bg-orange-500 blink": props.online,
    })}
  />
);

const getSubtitle = (channel, loading, playing) => {
  if (loading) {
    return "Loading...";
  }
  if (playing) {
    return "Playing";
  }
  if (channel?.online) {
    return "Live";
  }
  return "Offline";
};

const LivePlayer = ({ channel }) => {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const subtitle = getSubtitle(channel, loading, playing);

  if (!channel.online) return false

  return (
    <div className="p-5 border-r-4 border-t-4 text-lg border-t-black/20 border-r-black/20 border-l-4 border-l-black/10 border-b-4 border-b-black/10 w-[150px] mr-2" onClick={() => setPlaying(!playing)}>
      <Image src={defaultTrackImage} alt={channel?.title} width={85} height={85} className="rounded-3xl object-cover h-[85px] border border-gray-500/10 mb-4" />
      <div className="flex items-center">
        <OnAir online />
        <div className="text-white/80 uppercase">{subtitle}</div>
      </div>
      <LiveAudio playing={playing} src={channel.streamUrl} isLoading={loading} setIsLoading={setLoading} />
    </div>
  );
};

export default LivePlayer;
