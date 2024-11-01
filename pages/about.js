

const Anchor = ({ href, children, props}) => (
  <a {...props} className="underline hover:no-underline cursor-pointer" target="_blank" href={href}>{children}</a>
)

export default function About() {
  return (
    <div className="w-100 bg-fuchsia-950/15 pixelify-sans-regular w-screen min-h-screen flex justify-center p-14 text-justify">
      <div className="max-w-[520px] w-full mt-5">
        <h1 className="text-2xl text-orange-500 text-center">About</h1>

        <p className="mt-5 text-lg text-white/80 drop-shadow">
          This website was made with love by <Anchor href="https://www.instagram.com/nikolazaris">Niko</Anchor> and <Anchor href="https://www.instagram.com/cyril.engman/">Cyril</Anchor> for the attendees of Hackaday Supercon8. The website lets you to listen to recorded music and live music from the event.
          The source code is available on <Anchor href="https://github.com/nlaz/supercon-demo-site">GitHub</Anchor>.
        </p>

        <p className="mt-5 text-lg text-white/80 drop-shadow">
          We used custom hardware that we built to stream and record audio. The hardware is based on a Raspberry Pi and a custom PCB.
        </p>

        <p className="mt-5 text-lg text-white/80">
          If you would like to see more, follow us at <Anchor href="https://www.instagram.com/garage.hq/">The Garage</Anchor>. If you are interested in more audio streaming, check us out at <Anchor href="https://www.instagram.com/eveningsgroup/">Evenings.FM</Anchor>.
        </p>

        <p className="mt-5 text-lg text-white/80">
          Feeling extra Boogie Woogie? Check out these <Anchor href="https://en.wikipedia.org/wiki/Beech_blight_aphid">funky aphids</Anchor>.
        </p>
      </div>
    </div>
  );
}
