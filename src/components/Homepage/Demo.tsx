import mercedes from '../../assets/mercedes.png'
import acura from '../../assets/acura.png'
import volks from '../../assets/volks.png'
import honda from '../../assets/honda.png'
import audi from '../../assets/audi.png'
import bmw from '../../assets/bmw.png'
import hero from '../../assets/hero-bg.jpg'

import { useState } from 'react'
const Demo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlayVideo = () => {
        setIsPlaying(true);
      };
  return (
    <div className="my-20 relative rounded-xl h-screen overflow-hidden">
      {/* Background Image */}
      
   
      {isPlaying && (
        <div className="absolute flex justify-center items-center inset-0 w-full h-full z-50">
       <iframe width="1300" height="700" src="https://www.youtube.com/embed/Y-x0efG1seA?si=fymYYvxmNviiD121" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      )}

      {/* Background */}
      {!isPlaying && (
        <>
          <div className="absolute inset-0 bg-cover bg-center"  style={{
              backgroundImage: `url(${hero})`,
            }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </>
      )}

      {/* Content */}
      {!isPlaying && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-orange-400 text-sm uppercase mb-2">* Watch Full Video</p>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            Discover the ease and <br /> convenience of renting with Us
          </h1>

          {/* Play Button with Ripple Effect */}
          <div className="relative flex items-center justify-center">
            {/* Ripple Effect */}
            <div className="absolute w-24 h-24 rounded-full border-2 border-orange-500 opacity-75 animate-ripple"></div>
            <div className="absolute w-24 h-24 rounded-full border-2 border-orange-500 opacity-50 animate-ripple delay-1s"></div>
            <div className="absolute w-24 h-24 rounded-full border-2 border-orange-500 opacity-25 animate-ripple delay-2s"></div>

            {/* Button */}
            <button
              onClick={handlePlayVideo}
              className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-orange-600 relative z-10"
              aria-label="Play Video"
            >
              ▶
            </button>
          </div>
        </div>
      )}
      {/* Sliding Brands */}
      <div className="absolute py-4 h-20 bottom-10 w-full ">
        <div className="relative overflow-hidden">
          <div className="flex justify-center">
            {[
              acura,
              honda,
              mercedes,
              audi,
              bmw,
              volks,
            ].map((brand, index) => (
              <div
                key={index}
                className="flex h-20 items-center  bg-zinc-700 justify-center px-6  opacity-80 hover:opacity-100"
              >
                <img
                  src={brand} // Replace with actual logo paths
                  alt={`${brand} logo`}
                  className=" h-20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    
    
    </div>
  );
};

export default Demo;
