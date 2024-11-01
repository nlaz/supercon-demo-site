import * as api from "@/api";
import React, { useEffect, useRef } from "react";
import LivePlayer from "@/components/LivePlayer";
import Track from "@/components/Track";
import Head from "next/head";
import { CircleHelp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ tracks, channels }) {
  const trackRefs = useRef({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && trackRefs.current[hash]) {
        trackRefs.current[hash].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const scrollToTrack = (trackId) => {
    if (trackRefs.current[trackId]) {
      window.location.hash = trackId;

      trackRefs.current[trackId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="w-100 bg-fuchsia-900/15 pixelify-sans-regular w-screen min-h-screen flex justify-center py-20">
      <div className="flex flex-col max-w-[520px] w-full">
        <Head>
          <title>My page title</title>
        </Head>
        <h1 className="jacquard-24-regular text-white/85 drop-shadow text-3xl lg:text-4xl text-center">
          Boogie Woogie <span className="text-orange-500">Supercon 2024</span>
        </h1>

        <Link className="absolute top-10 flex justify-center lg:justify-end right-0 left-0 lg:right-20 lg:top-16 items-center drop-shadow" href="about">
          <CircleHelp className="text-black/80" />
          <span className="text-black/80 text-xl ml-1">About</span>
        </Link>

        <div className="flex mt-5">
          {channels.map((channel) => (
            <LivePlayer channel={channel} key={channel.id} />
          ))}
        </div>

        <div className="pixelify-sans-regular text-black/80 mt-6 mb-3 text-2xl drop-shadow text-center">Recorded music</div>
        <div className="max-w-lg mt-2 px-3 lg:px-0">
          {tracks.map((track) => (
            <div key={track.id} ref={(el) => (trackRefs.current[track.id] = el)}>
              <Track track={track} onClick={() => scrollToTrack(track.id)} />
            </div>
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
