/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaPhone,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import signupAnimation from "/signup.gif";
import { useSignupMutation } from "../redux/features/auth/authApi";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [signup] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Signing up...");

    const userInfo = { ...data, role: "user" };

    try {
      const res = await signup(userInfo).unwrap();
      console.log(res);
      if (res.statusCode === 201) {
        toast.success("Registration successful!", {
          id: toastId,
          duration: 2000,
          className: "text-orange-600",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (signUpError: any) {
      console.log(signUpError);
      if (signUpError.status === 400 && signUpError.data) {
        toast.error(`SignUp Failed: ${signUpError.data.message}`, {
          id: toastId,
          duration: 4000,
          className: "text-red-700",
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
          className: "bg-red-500 text-white",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-auto mt-24  ">
      <div className="grid md:grid-cols-2 items-center gap-4 h-full">
        <div className="flex justify-center">
          <img src={signupAnimation} className=" w-72 z-50  relative" />
        </div>

        <form
          className="max-w-lg max-md:mx-auto w-full p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6">
            <h3 className="text-orange-600 text-5xl text-center uppercase font-teko">
              Sign Up
            </h3>
          </div>

          {/* Name Field */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-baseline max-md:flex-col max-md:items-start">
              <label className="text-orange-600 text-base mb-2 block w-1/6 text-left max-md:w-full">
                Name
              </label>
              <div className="relative flex items-center w-5/6 max-md:w-full">
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full text-sm text-orange-600 bg-gray-100  focus:bg-white px-4 py-2 rounded-none"
                  placeholder="Full Name"
                />
                <FaUser className="absolute right-4 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <p
              className={`text-red-700 text-xs italic text-right h-2 ${
                errors.email ? "block" : "invisible"
              }`}
            >
              {errors.name?.message as string}
            </p>
          </div>

          {/* Email Field */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-baseline max-md:flex-col max-md:items-start">
              <label className="text-orange-600 text-base mb-2 block w-1/6 text-left max-md:w-full">
                Email
              </label>
              <div className="relative flex items-center w-5/6 max-md:w-full">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  className="w-full text-sm text-orange-600 bg-gray-100  focus:bg-white px-4 py-2 rounded-none"
                  placeholder="Enter email"
                />
                <FaEnvelope className="absolute right-4 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <p
              className={`text-red-700 text-xs italic text-right h-2 ${
                errors.email ? "block" : "invisible"
              }`}
            >
              {errors.email?.message as string}
            </p>
          </div>

          {/* Password Field */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-baseline max-md:flex-col max-md:items-start">
              <label className="text-orange-600 text-base mb-2 block w-1/6 text-left max-md:w-full">
                Password
              </label>
              <div className="relative flex items-center w-5/6 max-md:w-full">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full text-sm text-orange-600 bg-gray-100  focus:bg-white px-4 py-2 rounded-none"
                  placeholder="Enter password"
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
              </div>
            </div>
            <p
              className={`text-red-700 text-xs italic text-right h-2 ${
                errors.password ? "block" : "invisible"
              }`}
            >
              {errors.password?.message as string}
            </p>
          </div>

          {/* Phone Field */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-baseline max-md:flex-col max-md:items-start">
              <label className="text-orange-600 text-base mb-2 block w-1/6 text-left max-md:w-full">
                Phone
              </label>
              <div className="relative flex items-center w-5/6 max-md:w-full">
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  type="number"
                  className="w-full text-sm text-orange-600 bg-gray-100  focus:bg-white px-4 py-2 rounded-none"
                  placeholder="Phone Number"
                />
                <FaPhone className="absolute right-4 bg-gray-50 text-gray-400 w-4 h-6" />
              </div>
            </div>
            <p
              className={`text-red-700 text-xs italic text-right h-2 ${
                errors.phone ? "block" : "invisible"
              }`}
            >
              {errors.phone?.message as string}
            </p>
          </div>

          {/* Address Field */}
          <div className="mt-4 flex flex-col">
            <div className="flex items-baseline max-md:flex-col max-md:items-start">
              <label className="text-orange-600 text-base mb-2 block w-1/6 text-left max-md:w-full">
                Address
              </label>
              <div className="relative flex items-center w-5/6 max-md:w-full">
                <input
                  {...register("address", { required: "Address is required" })}
                  type="text"
                  className="w-full text-sm text-orange-600 bg-gray-100  focus:bg-white px-4 py-2 rounded-none"
                  placeholder="Address"
                />
                <FaHome className="absolute right-4 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <p
              className={`text-red-700 text-xs italic text-right h-2 ${
                errors.address ? "block" : "invisible"
              }`}
            >
              {errors.address?.message as string}
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-12 flex">
            <button
              type="submit"
              className="shadow-xl py-1 mx-auto px-6 w-1/2 text-lg tracking-wide font-semibold rounded-none text-white bg-orange-600 hover:bg-green-700 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
