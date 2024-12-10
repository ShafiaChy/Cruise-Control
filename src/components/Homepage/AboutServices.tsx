import About from '../../assets/about.jpg'
// import './AboutServices.css'
const AboutServices = () => {
    return (
        <section className="my-28 bg-black text-white py-16 px-8 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-orange-500 font-bold uppercase text-sm tracking-wide">
              Cruise Control
            </h2>
            <h1 className="text-4xl font-bold leading-tight mt-4">
              We Are More Than <br />
              <span className="text-orange-500">A Car Rental Company</span>
            </h1>
            <p className="text-gray-400 mt-6">
              Car repair quisque sodales dui ut varius vestibulum drana tortor
              turpis porttitor tellus eu euismod nisl massa nutodio in the miss
              volume place urna lacinia eros nunta urna mauris vehicula rutrum in
              the miss on volume interdum.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <span className="text-orange-500  rounded-full p-2">
                  ✓
                </span>
                <span className="ml-4">Sports and Luxury Cars</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500  rounded-full p-2">
                  ✓
                </span>
                <span className="ml-4">Economy Cars</span>
              </div>
            </div>
            <button className="mt-8 px-6 py-3 bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-600 transition hover:border-orange-500">
              Read More →
            </button>
          </div>
  
          {/* Right Content */}
          <div className="relative ">
            <img src={About} alt="Car" className="rounded-custom w-full h-auto"/>
            <div className="absolute inset-0 flex items-center justify-center">
                <a href="https://youtu.be/1LxcTt1adfY" className="button-container flex items-center justify-center w-16 h-16 bg-transparent rounded-full text-white hover:bg-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" className="play-button glow-button">
                <circle cx="32" cy="32" r="31" fill="none" stroke="#f97316" stroke-width="2" opacity="0.9" />
                <polygon points="25,20 25,44 45,32" fill="#1C00ff00" stroke="#fff" stroke-width="2"  opacity="0.9" />
                </svg>
                </a>
            </div>
            </div>
        </div>
      </section>
    );
  };
  
  export default AboutServices;