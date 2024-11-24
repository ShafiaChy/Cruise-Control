/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (credentials: any) => {
    const toastId = toast.loading("Logging you in..");

    // Check if the user is already logged in and navigate to the dashboard if true

    try {
      const res = await login(credentials).unwrap();

      if (res.statusCode === 200) {
        const verifiedUser = verifyToken(res.token) as TUser;

        dispatch(setUser({ user: verifiedUser, token: res.token }));
        console.log(verifiedUser.role);
        toast.success("Logged in successfully!", {
          id: toastId,
          duration: 2000,
          className: "text-custom-green",
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
  };

  const handleClose = () => {
    if (location.pathname === "/login") {
      navigate(-1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "15.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-16 px-8 rounded-none w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />

          {/* Close Button */}

          <FiX
            onClick={handleClose}
            className="absolute top-3 right-3 text-black/80 rounded-full p-1 hover:scale-110 transition-transform duration-300 text-3xl bg-white border  "
          />

          <h1 className="text-2xl font-semibold tracking-wide mb-6 text-center">
            WELCOME BACK
          </h1>

          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="  ">
              <div className=" flex flex-col md:flex-row items-baseline">
                <label className="text-white text-left py-1 w-1/5">
                  Email:
                </label>

                <div className="flex  flex-col  w-full">
                  <input
                    className="w-full px-4 py-1 bg-white/70 rounded-none text-black/70 focus:outline-none "
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                  <p
                    className={`text-red-700 text-xs italic text-right h-4 ${
                      errors.email ? "block" : "invisible"
                    }`}
                  >
                    {errors.email?.message as string}
                  </p>
                </div>
              </div>
            </div>

            <div className=" ">
              <div className=" flex  flex-col md:flex-row  items-baseline">
                <label className="text-white text-left mt-1  py-1 w-1/5">
                  Password:
                </label>
                <div className="flex flex-col w-full">
                  <input
                    className="w-full px-4 py-1  bg-white/70 text-black/70 rounded-none focus:outline-none "
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },
                    })}
                  />
                  <p
                    className={` text-red-700 text-xs italic text-right h-4 ${
                      errors.password ? "block" : "invisible"
                    }`}
                  >
                    {errors.password?.message as string}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-white hover:opacity-90 transition-opacity text-custom-green font-semibold py-2 mt-6 rounded-none w-1/3 focus:border-none"
              >
                Login
              </button>
            </div>
          </form> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="flex flex-col md:flex-row items-baseline">
                <label className="text-white text-left py-1 w-1/5">
                  Email:
                </label>

                <div className="relative flex flex-col w-full">
                  <input
                    className="w-full px-4 py-1 bg-white/70 rounded-none text-black/70 focus:outline-none "
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                  <FaEnvelope className="absolute right-4 top-2 text-gray-500 w-4 h-4" />
                  <p
                    className={`text-red-700 text-xs italic text-right h-4 ${
                      errors.email ? "block" : "invisible"
                    }`}
                  >
                    {errors.email?.message as string}
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex flex-col md:flex-row items-baseline">
                <label className="text-white text-left mt-1 py-1 w-1/5">
                  Password:
                </label>
                <div className="relative flex flex-col w-full">
                  <input
                    className="w-full px-4 py-1 bg-white/70 text-black/70 rounded-none focus:outline-none "
                    type={showPassword ? "text" : "password"}
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
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-white hover:opacity-90 transition-opacity text-custom-green font-semibold py-2 mt-6 rounded-none w-1/3 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center w-4/5 mx-auto mt-6  text-sm tracking-wide text-gray-800">
            Don't have an account?
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
