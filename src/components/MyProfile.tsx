/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPhone, FaEnvelope, FaHome } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  useGetUserInfoQuery,
  useUpdateUserMutation,
} from "../redux/features/user/userApi";
import { useCurrentToken, setUser } from "../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import defaultAvatar from "/avatar.jpg";
import Spinner from "./Spinner";
import LoadingError from "./LoadingError";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState(false);

  const token = useAppSelector(useCurrentToken);
  const finalToken = `Bearer ${useAppSelector(useCurrentToken)}`;
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const { data: userInfo, error, isLoading } = useGetUserInfoQuery(undefined);

  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo?.data && isEditMode) {
      const { name, email, phone, address } = userInfo.data;
      setValue("name", name);
      setValue("email", email);
      setValue("phone", phone);
      setValue("address", address);
    }
  }, [userInfo, isEditMode, setValue]);

  const onSubmit = async (data: any) => {
    const updatedUserInfo = { ...data, role: userRole };

    try {
      const res = await updateUser({
        token: finalToken,
        updatedUserInfo,
      }).unwrap();

      if (res.statusCode === 200) {
        dispatch(setUser({ user: res.data, token: token }));

        toast.success("Profile updated successfully!", {
          duration: 2000,
          className: "text-orange-600",
        });

        setIsEditMode(false);
      }
    } catch (updateError: any) {
      if (updateError.status === 400) {
        toast.error("Invalid input, please check your data.", {
          duration: 4000,
          className: "text-red-700",
        });
      } else {
        toast.error(`Error: ${updateError.data.message}`, {
          duration: 4000,
          className: "text-red-700",
        });
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <LoadingError />;

  const { name, email, phone, address } = userInfo?.data || {};

  return (
    <section className="w-full min-h-screen  ">
      <div className="w-full mx-auto flex flex-col lg:flex-row bg-transparent text-white rounded-none overflow-hidden">
        {/* Left Side */}
        <div className="w-full lg:w-2/5 bg-gray-100/80 text-gray-800 p-4 md:p-8 flex flex-col items-center text-center relative">
          <img
            src={defaultAvatar}
            alt="User Avatar"
            className="rounded-full w-40 h-40 mb-4"
          />
          <div className="px-12 w-full">
            <h2 className="text-xl font-semibold pb-4  border-b-2 border-custom-green/50 ">
              Welcome {name}!
            </h2>
          </div>

          <div className="mt-8 mb-16 space-y-4 w-full text-sm">
            <div className="flex items-center justify-between ">
              <span className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4" />
                <span>Email</span>
              </span>
              <span className="italic">{email}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <FaPhone className="w-4 h-4" />
                <span>Phone</span>
              </span>
              <span>{phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <FaHome className="w-4 h-4" />
                <span>Address</span>
              </span>
              <span>{address}</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-3/5 md:p-8 px-4 py-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold ms-6 text-orange-600">
              Profile Information
            </h3>
            <label className="inline-flex items-center ">
              <input
                type="checkbox"
                checked={isEditMode}
                onChange={() => setIsEditMode(!isEditMode)}
                className="form-checkbox h-4 w-4 text-gray-400"
              />

              <span className="ml-2 text-sm text-gray-400">Edit Profile</span>
            </label>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="mx-auto w-full text-white
               md:p-6 p-0 rounded-lg"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className={`mb-1 block text-sm font-semibold ${
                      isEditMode ? "text-orange-600" : "text-gray-50"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    {...register("name", { required: "Full Name is required" })}
                    className={`w-full py-1.5 px-2 text-sm ${
                      isEditMode
                        ? "bg-white text-gray-800"
                        : "bg-gray-200 text-gray-400 "
                    }`}
                    disabled={!isEditMode}
                  />
                  <p
                    className={`${
                      errors.name ? "visible" : "invisible"
                    } text-red-700 text-xs italic text-right h-2`}
                  >
                    {errors.name?.message as string}
                  </p>
                </div>

                {/* Phone Number */}
                <div className="mb-3">
                  <label
                    htmlFor="phone"
                    className={`mb-1 block text-sm font-semibold ${
                      isEditMode ? "text-orange-600" : "text-gray-50"
                    }`}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter your phone number"
                    {...register("phone", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    className={`w-full py-1.5 px-2 text-sm ${
                      isEditMode
                        ? "bg-white text-gray-800"
                        : "bg-gray-200 text-gray-400 "
                    }`}
                    disabled={!isEditMode}
                  />
                  <p
                    className={`${
                      errors.phone ? "block" : "invisible"
                    } text-red-700 text-xs italic text-right h-2`}
                  >
                    {errors.phone?.message as string}
                  </p>
                </div>

                {/* Email Address */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className={`mb-1 block text-sm font-semibold ${
                      isEditMode ? "text-orange-600" : "text-gray-50"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email Address is required",
                      pattern: {
                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                        message: "Invalid email address format",
                      },
                    })}
                    className={`w-full py-1.5 px-2 text-sm ${
                      isEditMode
                        ? "bg-white text-gray-800"
                        : "bg-gray-200 text-gray-400 "
                    }`}
                    disabled={!isEditMode}
                  />
                  <p
                    className={`${
                      errors.email ? "block" : "invisible"
                    } text-red-700 text-xs italic text-right h-2`}
                  >
                    {errors.email?.message as string}
                  </p>
                </div>

                {/* Address Details */}
                <div className="mb-5">
                  <label
                    className={`mb-1 block text-sm font-semibold ${
                      isEditMode ? "text-orange-600" : "text-gray-50"
                    }`}
                  >
                    Address
                  </label>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3">
                      <div className="mb-5">
                        <textarea
                          id="address"
                          placeholder="Enter full address details"
                          {...register("address", {
                            required: "Address details are required",
                          })}
                          className={`w-full py-1.5 px-2 text-sm ${
                            isEditMode
                              ? "bg-white text-gray-800"
                              : "bg-gray-200 text-gray-400 "
                          }`}
                          rows={5}
                          disabled={!isEditMode}
                        />
                        <p
                          className={`${
                            errors.address ? "block" : "invisible"
                          } text-red-700 text-xs italic text-right h-2`}
                        >
                          {errors.address?.message as string}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                {isEditMode && (
                  <div className="flex justify-center">
                    <button className="w-2/3 rounded-none bg-orange-600 py-2 px-8 text-center text-lg font-semibold text-white focus:outline-none hover:bg-green-600 hover:border-green-600">
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
