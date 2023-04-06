import * as api from "@/api";
import Image from "next/image";
import { getTrackDuration, getDateShort } from "@/utils";

const defaultTrackImage =
  "https://ecr-streams.s3.us-east-2.amazonaws.com/assets/sol-logo.jpg";

const Header = ({ status }) => {
  console.log(status);
  return (
    <div className="header">
      {status.status === "offline" ? (
        <div className="header__offline">Offline</div>
      ) : (
        <div className="header__live">Live</div>
      )}
      <audio controls src="https://s1.evenings.co/s/evenings" />
    </div>
  );
};

const Track = ({ track }) => {
  return (
    <div className="track">
      <div className="track__image">
        <Image
          src={track.image ?? defaultTrackImage}
          alt={track.title}
          width={370}
          height={370}
        />
      </div>
      <div className="track__info">
        <div className="track__duration">
          {getTrackDuration(track.duration)}
        </div>
        <div className="track__title">
          {track.title ?? "TRACK ON " + getDateShort(track.createdAt)}
        </div>
      </div>
      <div className="track__audio">
        <audio controls src={track.location} />
      </div>
    </div>
  );
};
export default function Home({ tracks, status }) {
  return (
    <div className="container">
      <Header status={status} />
      {tracks.slice(0, 10).map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const status = await api.fetchStatus();
    const tracks = await api.fetchTracks();

    return { props: { status, tracks } };
  } catch (e) {
    return { props: { status: {}, tracks: [] } };
  }
}
