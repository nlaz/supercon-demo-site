import * as api from "@/api";
import Track from "@/components/Track";
import Head from "next/head";
import cx from "clsx";
import Image from "next/image";

const defaultTrackImage =
  "https://evenings.s3.us-east-2.amazonaws.com/images/1703883206523.png";

const Header = ({ status }) => {
  return (
    <div className="header">
      {status.online ? <div className="header__live">Live</div> : <div className="header__offline">Offline</div>}

      {status.online && <audio controls src="https://media.evenings.co/s/Kwekx1JG0" />}
    </div>
  );
};

const OnAir = (props) => (
  <div
    className={cx("h-[14px] w-[14px] bg-orange-500 mr-3", {
      "bg-orange-500 blink": props.online,
    })}
  />
);

const LivePlayer = ({ channel }) => {
  return (
    <div className="p-5 border-r-4 border-t-4 text-lg border-t-black/20 border-r-black/20 border-l-4 border-l-black/10 border-b-4 border-b-black/10 w-[150px] mr-2">
      <Image src={defaultTrackImage} alt={channel?.title} width={85} height={85} className="rounded-3xl object-cover h-[85px] border border-gray-500/10 mb-4" />
      <div className="flex items-center">
        <OnAir online />
        <div className="text-white/80 uppercase">Live</div>
      </div>
    </div>
  );
}

export default function Home({ tracks, status }) {
  return (
    <div className="w-100 bg-fuchsia-950/15 pixelify-sans-regular w-screen min-h-screen flex justify-center p-14">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Jacquard+24&family=Pixelify+Sans:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col">
        <div className="jacquard-24-regular text-white/85 shadow-sm text-3xl mb-8">
          Boogie Woogie Supercon
        </div>

        <div className="flex">
          <LivePlayer />
          <LivePlayer />
        </div>

        <div className="jacquard-24-regular text-white/80 mt-6 mb-2 text-lg">Recorded tracks</div>
        <div className="max-w-lg w-[520px] mt-2">
          {tracks.slice(0, 10).map((track) => (
            <Track key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const status = await api.fetchStatus();
    const tracks = await api.fetchTracks();

    return { props: { status, tracks } };
  } catch (e) {
    console.log("e", e);
    return { props: { status: {}, tracks: [] } };
  }
}
