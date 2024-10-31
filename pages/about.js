
export default function About() {
  return (
    <div className="w-100 bg-fuchsia-950/15 pixelify-sans-regular w-screen min-h-screen flex justify-center p-14 text-center">
      <div className="max-w-[520px] w-full mt-5">
        <h1 className="text-2xl text-orange-500">About</h1>

        <p className="mt-5 text-lg text-white/80 drop-shadow">
          This is a demo project made with love for the attendees of Hackaday Supercon8. It is a web app that allows you to listen to live and recorded music from the event.
        </p>

        <p className="mt-5 text-lg text-white/80">
          It was built by <a className="underline hover:no-underline" target="_blank" href="https://www.instagram.com/cyril.engman/">Cyril</a> and <a target="_blank" href="https://www.instagram.com/nikolazaris/" className="underline hover:no-underline">Niko</a> from <a className="underline hover:no-underline" href="https://www.instagram.com/garage.hq/" target="_blank">The Garage</a> in Brooklyn. If you are interested in how it was made, give us a shout!
        </p>
      </div>
    </div>
  );
}
