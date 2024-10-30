import Image from "next/image";
import cx from "clsx";
import LiveAudio from "./LiveAudio";
import { useState } from "react";
import ImageViewer from "./ImageViewer";

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
    <div className="p-5 border-r-4 border-t-4 text-lg border-t-black/20 border-r-black/20 border-l-4 border-l-black/10 border-b-4 border-b-black/10 w-[150px] mr-2 flex flex-col items-center" onClick={() => setPlaying(!playing)}>
      <ImageViewer image={channel?.url} playing={playing} />
      <div className="flex items-center w-full mt-3">
        <OnAir online />
        <div className="text-white/80 uppercase">{subtitle}</div>
      </div>
      <LiveAudio playing={playing} src={channel.streamUrl} isLoading={loading} setIsLoading={setLoading} />
    </div>
  );
};

export default LivePlayer;
