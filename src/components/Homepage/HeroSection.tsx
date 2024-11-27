import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideoUrl from "../../assets/car-hero-video.mp4";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/bike-listing?filterBy=${filterBy}&searchTerm=${searchTerm}`);
  };

  const [selectedVehicle, setSelectedVehicle] = useState("Car");

  const vehicles = ["Car", "Van", "Minibus", "Coupe", "Bike"];
  return (
    // <div className="relative w-full h-[100vh] bg-gradient text-white overflow-hidden">
    // <div className="absolute inset-0">
    //     <video
    //       className="object-cover object-bottom w-full h-full"
    //       src={backgroundVideoUrl} 
    //       autoPlay
    //       loop
    //       muted
    //       playsInline // Ensures compatibility on mobile devices
    //     ></video>
    //     <div className="absolute inset-0 bg-black opacity-50"></div>
    //   </div>

    //   <div className="relative z-10 flex flex-col justify-center h-full">
    //     <div className="mt-auto mb-[25%] md:mb-[15%] w-full max-w-md mx-auto text-center ">
    //       <p className="text-xl text-gray-300 mb-4">
    //         Discover amazing rides that awaits you.
    //       </p>

    //       <form onSubmit={handleSubmit}>
    //         <div className="flex items-center bg-white/20 rounded-none overflow-hidden justify-between">
    //           <input
    //             className="text-base bg-transparent text-white/80 flex-grow outline-none px-2"
    //             type="text"
    //             placeholder="Search for your bike"
    //             value={searchTerm}
    //             onChange={handleSearchChange}
    //           />
    //           <div className="ms:flex items-center rounded-none mx-auto">
    //             <select
    //               id="Com"
    //               className="text-sm text-gray-800 outline-none bg-white/50 border-2 border-white/10 px-6 py-2.5 rounded-none"
    //               value={filterBy}
    //               onChange={handleFilterChange}
    //             >
    //               <option value="name">Name</option>
    //               <option value="brand">Brand</option>
    //               <option value="model">Model</option>
    //             </select>
    //             <button
    //               type="submit"
    //               className="bg-custom-green text-white text-base rounded-none px-4 py-2 border border-custom-green"
    //             >
    //               Search
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="relative w-full h-screen bg-black py-10">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={backgroundVideoUrl}
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
        {/* Logo */}
        <h1 className="mt-12 text-4xl font-bold text-orange-500">CRUISE<span className="text-white">CONTROL</span></h1>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold my-4">
          Looking to save more on your rental car?
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Whether you're planning a weekend getaway, a business trip, or just
          need a reliable ride for the day, we offer a wide range of vehicles to
          suit your needs.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
            Book A Rental
          </button>
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>

        {/* Form Section */}
        {/* <form className="w-5/12" onSubmit={handleSubmit}>
             <div className="mt-10 flex items-center bg-white/20 rounded-none overflow-hidden justify-between ">
                <input
                 className="text-base bg-transparent text-white/80 flex-grow outline-none px-2 "
                 type="text"
                 placeholder="Search for your bike"
                 value={searchTerm}
                 onChange={handleSearchChange}
               />
               <div className="ms:flex items-center rounded-none mx-auto">
                 <select
                   id="Com"
                   className="text-sm text-gray-800 outline-none bg-white border-2 border-white/10 px-6 py-2.5 rounded-none"
                   value={filterBy}
                   onChange={handleFilterChange}
                 >
                   <option value="name">Name</option>
                   <option value="brand">Brand</option>
                   <option value="model">Model</option>
                 </select>
                 <button
                  type="submit"
                   className="bg-orange-500 text-white text-base rounded-none px-4 py-2 border  border-orange-500"
                 >
                   Search
                 </button>
               </div>
             </div>
           </form> */}
        <div className="mt-10 bg-black opacity-85 text-white p-6 rounded-md w-2/5 mx-auto">
          
          <div className="flex space-x-2 mb-6">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle}
                className={`flex-1 py-2 rounded-md text-center text-sm font-medium ${
                  selectedVehicle === vehicle
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                {vehicle}
              </button>
            ))}
          </div>
          <form className="space-y-4">
            <div className="flex gap-2">
              
              <select
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Model</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
              </select>
              <button
              type="submit"
              className="w-1/2 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
            >
              Find a Vehicle
            </button>
            </div>
          
            
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
