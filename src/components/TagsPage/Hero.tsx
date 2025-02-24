import Slideshow from './Slideshow';

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] text-white mb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Slideshow />
      </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,41,55,1)_30%,rgba(31,41,55,0)_100%)] z-10" />
      <div className="relative z-20 max-w-7xl mx-auto py-20 px-6 flex flex-col items-start space-y-6">
        <h1 className="text-5xl font-bold drop-shadow">
          Reliable Robot Resources
        </h1>
        <p className="text-lg max-w-xl drop-shadow">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolorem obcaecati minus? Odit veniam, pariatur porro natus fuga hic! Culpa est repellat quas necessitatibus dolor ipsum! Non vel quae qui!
        </p>
      </div>
    </section>
  );
}
