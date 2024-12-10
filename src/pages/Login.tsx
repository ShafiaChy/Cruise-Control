import  { useState } from "react";
import backgroundVideoUrl from '../assets/car-loginvideo.mp4'

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
   <div>
    <video
        className="absolute inset-0 w-full h-full object-cover"
        src={backgroundVideoUrl}
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="absolute inset-0 bg-black opacity-40"></div>
     <div
      className={`container  mt-36 mx-auto relative w-[768px] max-w-full min-h-[480px] bg-[#131313] rounded-lg shadow-lg overflow-hidden ${
        isRightPanelActive ? "right-panel-active" : ""
      }`}
    >
     
      {/* Sign-Up Form */}
     {isRightPanelActive ?
        <form className=" h-full p-12 flex items-center justify-end">
         <div className="w-full md:w-5/12 py-10 h-full">
         <h1 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h1>
          {/* <div className="flex gap-2 mb-4">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div> */}
          {/* <span className="text-sm mb-4 my-2 flex justify-center">or use your email for registration</span> */}
          <input
            type="text"
            placeholder="Name"
            className="input-field "
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <button className="btn w-full">Sign In</button>
          <div className="flex flex-col md:hidden mt-2">
            <span className="text-white text-center">Or</span>
            <button 
            className="text-orange-500 bg-transparent hover:bg-transparent"
            onClick={() => setIsRightPanelActive(false)}>Sign In</button>
          </div>
         </div>
        </form>
 
     :
     
     
        <form className="flex flex-col items-center justify-center h-full p-12 w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-6 mt-12 text-white">Sign in</h1>
          {/* <div className="flex gap-2 mb-4">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div> */}
          {/* <span className="text-sm mb-4">or use your account</span> */}
          <input
            type="email"
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <span className="text-xs mt-2 text-gray-500 mb-3">Forgot your password?</span>
          <button className="btn w-full ">Sign In</button>
          <div className="flex flex-col md:hidden mt-2">
            <span className="text-center text-white">Or</span>
            <button 
            className="text-orange-500 bg-transparent hover:bg-transparent"
            onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
          </div>
        </form>
}
      {/* Overlay */}
      <div
        className={` hidden overlay-container absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-orange-500 to-red-500 text-white md:flex items-center justify-center transition-transform duration-500 ${
          isRightPanelActive ? "-translate-x-full" : ""
        }`}
      >
        <div className="overlay absolute w-[200%] flex justify-center">
          {/* Overlay Left */}
         {
          isRightPanelActive &&  <div className="overlay-panel w-1/2 p-12 text-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="mt-4">To keep connected with us, please login with your personal info</p>
          <button
            className="ghost-btn mt-6"
            onClick={() => setIsRightPanelActive(false)}
          >
            Sign In
          </button>
        </div>
         }

          {/* Overlay Right */}
        {
          !isRightPanelActive && 
            <div className="overlay-panel flex mx-auto p-12 text-center">
            <div>
            <h1 className="text-2xl font-bold">Hello, Friend!</h1>
            <p className="mt-4 w-3/4  flex mx-auto">Enter your personal details and start your journey with us</p>
            <button
              className="ghost-btn mt-6"
              onClick={() => setIsRightPanelActive(true)}
            >
              Sign Up
            </button>
            </div>
          </div>
          
        }
      
        </div>
      </div>
    </div>
   </div>
  );
};

export default Login;
