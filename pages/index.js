import * as api from "@/api";
import LivePlayer from "@/components/LivePlayer";
import Track from "@/components/Track";
import Head from "next/head";
import { CircleHelp } from "lucide-react";
import Link from "next/link";

export default function Home({ tracks, channels }) {
  return (
    <div className="w-100 bg-fuchsia-950/15 pixelify-sans-regular w-screen min-h-screen flex justify-center py-20">
      <Head>
        <title>Boogie Woogie Supercon 2024</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Jacquard+24&family=Pixelify+Sans:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col">
        <h1 className="jacquard-24-regular text-white/85 drop-shadow text-4xl text-center">
          Boogie Woogie <span className="text-orange-500">Supercon 2024</span>
        </h1>

        <Link className="absolute right-20 top-16 flex items-center drop-shadow" href="about">
          <CircleHelp className="text-black/80"/>
          <span className="text-black/80 text-xl ml-1">About</span>
        </Link>

        <div className="flex mt-5">
          {channels.map((channel) => (
            <LivePlayer channel={channel} key={channel.id} />
          ))}
        </div>

        <div className="pixelify-sans-regular text-black/80 mt-6 mb-3 text-2xl drop-shadow text-center">
          Recorded music
        </div>
        <div className="max-w-lg w-[520px] mt-2">
          {tracks.map((track) => (
            <Track key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const channels = await api.fetchChannels();
    const tracks = await api.fetchTracks();

    return { props: { channels, tracks: tracks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) } };
  } catch (e) {
    console.log("e", e);
    return { props: { status: {}, tracks: [] } };
  }
}
