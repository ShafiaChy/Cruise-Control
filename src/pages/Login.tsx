/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useRef, useState } from "react";
import backgroundVideoUrl from '../assets/car-loginvideo.mp4'
import { useLoginMutation, useSignupMutation } from "../redux/features/auth/authApi";
import {  useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginButton, setLoginButton] = useState('login');
  const [signup] = useSignupMutation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

const handleClick =(flag:boolean, mode:string) =>{
  setIsRightPanelActive(flag)
  setLoginButton(mode)
}
  const onSubmit = async (data: any) => {
console.log('hi')
    if(loginButton ==='login'){
      const toastId = toast.loading("Logging you in..");

      // Check if the user is already logged in and navigate to the dashboard if true
  
      try {
        const res = await login(data).unwrap();
  
        if (res.statusCode === 200) {
          const verifiedUser = verifyToken(res.token) as TUser;
  
          dispatch(setUser({ user: verifiedUser, token: res.token }));
          console.log(verifiedUser.role);
          toast.success("Logged in successfully!", {
            id: toastId,
            duration: 2000,
            className: "text-orange-600",
          });
          setTimeout(() => {
            navigate(`/${verifiedUser.role}/dashboard`);
          }, 1000);
        }
      } catch (loginError: any) {
        console.log("login failed", loginError);
  
        if (loginError.status === 400) {
          toast.error("Invalid credentials, please try again.", {
            id: toastId,
            duration: 4000,
            className: "text-red-700",
          });
        } else {
          toast.error("Something went wrong", {
            id: toastId,
            duration: 2000,
            className: "text-red-700",
          });
        }
      }
    }else{
      
    

    const userInfo = { ...data, role: "user" };
    const toastId = toast.loading("Signing you up..");
    try {
      const res = await signup(userInfo).unwrap();
      console.log(res);
      if (res.statusCode === 201) {
        toast.success("Registration successful!", {
          id:toastId,
          duration: 2000,
          className: "text-orange-600",
        });
      
         
        setTimeout(() => {
          console.log("Login successful!");
          // Automatically click a button after success
          buttonRef.current?.click();
        }, 2000); 
        
      }
    } catch (signUpError: any) {
      console.log(signUpError);
      if (signUpError.status === 400 && signUpError.data) {
        toast.error(`SignUp Failed: ${signUpError.data.message}`, {
          id:toastId,
          duration: 4000,
          className: "text-red-700",
        });
      } else {
        toast.error("Something went wrong", {
          id:toastId,
          duration: 2000,
          className: "bg-red-500 text-white",
        });
      }
    }
    }
  };

  // const handleClose = () => {
  //   if (location.pathname === "/login") {
  //     navigate(-1);
  //   }
  // };

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
        <form onSubmit={handleSubmit(onSubmit)} className=" h-full p-12 flex items-center justify-end">
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
            {...register("name", { required: "Name is required" })}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />
          <input
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 6,
                                  message: "Password must be at least 6 characters",
                                },
                              })}
                              type={showPassword ? "text" : "password"}
            
            placeholder="Password"
            className="input-field"
          />

           {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-4 text-gray-400 w-4 h-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="absolute right-4 text-gray-400 w-4 h-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
            <p
              className={`text-red-700 text-xs italic text-right h-2 ${
                errors.password ? "block" : "invisible"
              }`}
            >
              {errors.password?.message as string}
            </p>
          <button type="submit" className="btn w-full">Sign Up</button>
          <div className="flex flex-col md:hidden mt-2">
            <span className="text-white text-center">Or</span>
            <button 
            className="text-orange-500 bg-transparent hover:bg-transparent"
            onClick={()=>handleClick(false, 'login')}>Sign In</button>
          </div>
         </div>
        </form>
 
     :
     
     
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-full p-12 w-full md:w-1/2">
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Entered value does not match email format",
              },
            })}

          />
          <input
           
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="input-field"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
           {showPassword ? (
                    <FaEyeSlash
                      className="absolute right-4 top-2  text-gray-500 w-4 h-4 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      className="absolute right-4 top-1   text-gray-500 w-4 h-6"
                      onClick={togglePasswordVisibility}
                    />
                  )}

                  <p
                    className={`text-red-700 text-xs italic text-right h-4 ${
                      errors.password ? "block" : "invisible"
                    }`}
                  >
                    {errors.password?.message as string}
                  </p>
          <span className="text-xs mt-2 text-gray-500 mb-3">Forgot your password?</span>
          <button  type="submit" className="btn w-full ">Sign In</button>
          <div className="flex flex-col md:hidden mt-2">
            <span className="text-center text-white">Or</span>
            <button 
            className="text-orange-500 bg-transparent hover:bg-transparent"
            onClick={()=>handleClick(true, 'signup')}>Sign Up</button>
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
          ref={buttonRef} 
            className="ghost-btn mt-6"
            onClick={()=>handleClick(false, 'login')}
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
              onClick={()=>handleClick(true, 'signup')}
              
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
