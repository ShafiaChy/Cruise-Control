/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { TCar } from "../../types/car";
import { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";

type CarModalProps = {
  Car?: TCar;
  onSubmit: (data: Omit<TCar, "_id">) => void;
  onClose: () => void;
};

const CarModal: React.FC<CarModalProps> = ({ Car, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TCar>({
    defaultValues: Car || {
      name: "",
      model: "",
      pricePerHour: 0,
      image: "",
      brand: "",
      cc: 0,
      year: new Date().getFullYear(),
      isAvailable: true,
      description: "",
    },
  });

  const [isChangingImage, setIsChangingImage] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  //  CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dvkpou1bp
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/upload`;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  // Populate form fields when editing a Car
  useEffect(() => {
    if (Car) {
      Object.keys(Car).forEach((key) => {
        setValue(key as keyof TCar, (Car as any)[key]);
      });
    }
  }, [Car, setValue]);

  const uploadImageToCloudinary = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (data: Omit<TCar, "_id">) => {
    try {
      let imageUrl = Car?.image;

      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      const updatedData = {
        ...data,
        image: imageUrl,
      };

      console.log("Final Form Data: ", updatedData);

      // Call the onSubmit function passed as a prop with the updated form data
      onSubmit(updatedData);
    } catch (error) {
      console.error("Failed to submit the form:", error);
    }
  };
  console.log(errors.cc);

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
          className="bg-white text-gray-800 py-3 px-8 rounded-none w-full max-w-lg md:max-w-3xl shadow-xl cursor-default relative overflow-hidden"
        >
          <FaTimes
            onClick={onClose}
            className="absolute top-3 right-3 text-white rounded-full p-1 hover:scale-110 transition-transform duration-300 text-2xl bg-gray-600 border"
          />

          <h1 className="text-xl font-semibold tracking-wide my-4 text-center">
            {Car ? "Edit Car Info" : "Add New Car"}
          </h1>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-2 py-4 px-8 w-full mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 md:justify-between">
              <div className="flex flex-col md:flex-row items-center md:w-3/5">
                <label className="text-gray-700 font-semibold text-base w-full md:w-32">
                  Name
                </label>
                <div className="w-full">
                  <input
                    className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                    type="text"
                    placeholder="Enter name"
                    {...register("name", { required: "Name is required" })}
                  />
                  <p
                    className={`text-orange-700 text-xs italic text-right h-1 ${
                      errors.name ? "block" : "invisible"
                    }`}
                  >
                    {errors.name?.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row   gap-4 md:gap-0">
                <div
                  className={`flex flex-row items-center ${
                    Car ? "md:w-1/2 w-full" : "md:w-full"
                  }  `}
                >
                  <label className="text-gray-700 font-semibold text-base md:w-20 w-1/2">
                    Available
                  </label>

                  <input
                    id="checkbox1"
                    type="checkbox"
                    className="hidden peer"
                    {...register("isAvailable")}
                  />

                  <label
                    htmlFor="checkbox1"
                    className="relative flex border-gray-300 rounded-none items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer bg-green-500 border overflow-hidden "
                  >
                    <GiCheckMark className="text-white w-full" />
                  </label>
                </div>

                {Car && (
                  <div className="flex flex-row items-center md:ml-4">
                    <label className="text-gray-700 font-semibold text-base md:w-24 w-1/2">
                      Change Image
                    </label>
                    <input
                      id="changeImageCheckbox"
                      type="checkbox"
                      className="hidden peer"
                      checked={isChangingImage}
                      onChange={() => setIsChangingImage(!isChangingImage)}
                    />
                    <label
                      htmlFor="changeImageCheckbox"
                      className="relative flex border-gray-300 rounded-none items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer bg-green-500 border overflow-hidden "
                    >
                      <GiCheckMark className="text-white w-full" />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between items-center md:gap-16 gap-4">
              <div className="w-full md:w-2/3">
                <div className="flex flex-col md:flex-row items-center pt-2">
                  <label className="text-gray-700 font-semibold text-base w-full md:w-36">
                    Model
                  </label>
                  <div className="w-full">
                    <input
                      className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                      type="text"
                      placeholder="Enter model"
                      {...register("model", { required: "Model is required" })}
                    />
                    <p
                      className={`text-orange-700 text-xs italic text-right h-1 ${
                        errors.model ? "block" : "invisible"
                      }`}
                    >
                      {errors.model?.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center pt-2">
                  <label className="text-gray-700 font-semibold text-base w-full md:w-36">
                    Brand
                  </label>
                  <div className="w-full">
                    <input
                      className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                      type="text"
                      placeholder="Enter brand"
                      {...register("brand", { required: "Brand is required" })}
                    />
                    <p
                      className={`text-orange-700 text-xs italic text-right h-1 ${
                        errors.brand ? "block" : "invisible"
                      }`}
                    >
                      {errors.brand?.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center pt-2">
                  <label className="text-gray-700 font-semibold text-base w-full md:w-36">
                    Price Per Hour
                  </label>
                  <div className="w-full">
                    <input
                      className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                      type="number"
                      placeholder="Enter price per hour"
                      {...register("pricePerHour", {
                        required: "Price is required",
                        valueAsNumber: true,
                      })}
                    />
                    <p
                      className={`text-orange-700 text-xs italic text-right h-4 mt-1 ${
                        errors.pricePerHour ? "block" : "invisible"
                      }`}
                    >
                      {errors.pricePerHour?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center w-full md:w-1/3 mt-6 md:mt-0 md:py-4">
                {!isChangingImage && Car?.image ? (
                  <img
                    src={Car.image}
                    alt={Car.name}
                    className="w-full h-24 md:h-32 object-cover border border-gray-300"
                  />
                ) : (
                  <label
                    htmlFor="uploadFile1"
                    className="ml-auto bg-white text-gray-500 font-semibold text-base rounded max-w-md h-24 md:h-32 flex flex-col items-center justify-center cursor-pointer border border-gray-300 border-dashed w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 mb-2 fill-gray-500"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                        data-original="#000000"
                      />
                      <path
                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                        data-original="#000000"
                      />
                    </svg>
                    Upload Image
                    <input
                      type="file"
                      id="uploadFile1"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
              {/* <div className="w-full flex flex-col md:flex-row items-start md:items-center">
                <label className="text-gray-700 font-semibold text-base w-1/3">
                  CC
                </label>
                <div className="w-full">
                  <input
                    className="md:w-2/3 px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                    type="number"
                    placeholder="Enter CC"
                    {...register("cc", {
                      required: "CC is required",
                      valueAsNumber: true,
                    })}
                  />
                  <p
                    className={`text-red-700 text-xs italic text-right h-5 ${
                      errors.cc ? "block" : "invisible"
                    }`}
                  >
                    {errors.cc?.message}
                  </p>
                </div>
              </div> */}

              <div className="w-full flex flex-col md:flex-row items-start md:items-center">
                <label className="text-gray-700 font-semibold text-base w-1/3">
                  CC
                </label>
                <div className="w-full">
                  <input
                    className="md:w-full px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                    type="number"
                    placeholder="Enter CC"
                    {...register("cc", {
                      required: "CC is required",
                      valueAsNumber: true,
                    })}
                  />
                  <p
                    className={`text-orange-700 text-xs italic text-right h-5 ${
                      errors.cc ? "block" : "invisible"
                    }`}
                  >
                    {errors.cc?.message}
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row items-start md:items-center">
                <label className="text-gray-700 font-semibold text-base w-1/3">
                  Year
                </label>
                <div className="w-full">
                  <input
                    className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                    type="number"
                    placeholder="Enter year"
                    {...register("year", {
                      required: "Year is required",
                      valueAsNumber: true,
                    })}
                  />
                  <p
                    className={`text-orange-700 text-xs italic text-right h-1 ${
                      errors.year ? "block" : "invisible"
                    }`}
                  >
                    {errors.year?.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center mt-4">
              <label className="text-gray-700 font-semibold text-base w-full md:w-32">
                Description
              </label>
              <div className="w-full">
                <textarea
                  className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                  placeholder="Enter description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <p
                  className={`text-red-700 text-xs italic text-right h-1 ${
                    errors.description ? "block" : "invisible"
                  }`}
                >
                  {errors.description?.message}
                </p>
              </div>{" "}
            </div>

            <div className="flex justify-end pt-4 text-sm">
              <button
                type="button"
                onClick={onClose}
                className="focus:outline-none modal-close px-4 bg-gray-500 rounded-none text-white hover:bg-gray-400 hover:border-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="focus:outline-none py-1 bg-orange-600 px-3 ml-3 rounded-none text-white hover:bg-green-600"
              >
                {Car ? "Update Car" : "Add Car"}
              </button>
            </div>
          </form>

          {/* <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-2 py-4 px-8 w-full mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 md:justify-between">
              <div className="flex flex-col md:flex-row items-center md:w-3/5">
                <label className="text-gray-700 font-semibold text-base w-full md:w-32">
                  Name
                </label>
                <div className="w-full">
                  <input
                    className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                    type="text"
                    placeholder="Enter name"
                    {...register("name", { required: "Name is required" })}
                  />
                  <p
                    className={`text-red-700 text-xs italic text-right h-1  ${
                      errors.name ? "block" : "invisible"
                    }`}
                  >
                    {errors.name?.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-0">
                <div
                  className={`flex flex-row items-center ${
                    Car ? "md:w-1/2 w-full" : "md:w-full"
                  }`}
                >
                  <label className="text-gray-700 font-semibold text-base md:w-20 w-1/2">
                    Available
                  </label>
                  <input
                    id="checkbox1"
                    type="checkbox"
                    className="hidden peer"
                    {...register("isAvailable")}
                  />
                  <label
                    htmlFor="checkbox1"
                    className="relative flex border-gray-300 rounded-none items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer bg-green-500 border overflow-hidden"
                  >
                    <GiCheckMark className="text-white w-full" />
                  </label>
                </div>

                {Car && (
                  <div className="flex flex-row items-center md:ml-4">
                    <label className="text-gray-700 font-semibold text-base md:w-24 w-1/2">
                      Change Image
                    </label>
                    <input
                      id="changeImageCheckbox"
                      type="checkbox"
                      className="hidden peer"
                      checked={isChangingImage}
                      onChange={() => setIsChangingImage(!isChangingImage)}
                    />
                    <label
                      htmlFor="changeImageCheckbox"
                      className="relative flex border-gray-300 rounded-none items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer bg-green-500 border overflow-hidden"
                    >
                      <GiCheckMark className="text-white w-full" />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between items-center md:gap-16 gap-4">
              <div className="w-full md:w-2/3">
                <div className="flex flex-col md:flex-row items-center pt-2">
                  <label className="text-gray-700 font-semibold text-base w-full md:w-36">
                    Model
                  </label>
                  <div className="w-full">
                    <input
                      className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                      type="text"
                      placeholder="Enter model"
                      {...register("model", { required: "Model is required" })}
                    />
                    <p
                      className={`text-red-700 text-xs italic text-right h-4 mt-1 ${
                        errors.model ? "block" : "invisible"
                      }`}
                    >
                      {errors.model?.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center pt-2">
                  <label className="text-gray-700 font-semibold text-base w-full md:w-36">
                    Brand
                  </label>
                  <div className="w-full">
                    <input
                      className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                      type="text"
                      placeholder="Enter brand"
                      {...register("brand", { required: "Brand is required" })}
                    />
                    <p
                      className={`text-red-700 text-xs italic text-right h-4 mt-1 ${
                        errors.brand ? "block" : "invisible"
                      }`}
                    >
                      {errors.brand?.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center pt-2">
                  <label className="text-gray-700 font-semibold text-base w-full md:w-36">
                    Price Per Hour
                  </label>
                  <div className="w-full">
                    <input
                      className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                      type="number"
                      placeholder="Enter price per hour"
                      {...register("pricePerHour", {
                        required: "Price is required",
                        valueAsNumber: true,
                      })}
                    />
                    <p
                      className={`text-red-700 text-xs italic text-right h-4 mt-1 ${
                        errors.pricePerHour ? "block" : "invisible"
                      }`}
                    >
                      {errors.pricePerHour?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center w-full md:w-1/3 mt-6 md:mt-0 md:py-4">
                {!isChangingImage && Car?.image ? (
                  <img
                    src={Car.image}
                    alt={Car.name}
                    className="w-full h-24 md:h-32 object-cover border border-gray-300"
                  />
                ) : (
                  <label
                    htmlFor="uploadFile1"
                    className="ml-auto bg-white text-gray-500 font-semibold text-base rounded max-w-md h-24 md:h-32 flex flex-col items-center justify-center cursor-pointer border border-gray-300 border-dashed w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 mb-2 fill-gray-500"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                        data-original="#000000"
                      />
                      <path
                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                        data-original="#000000"
                      />
                    </svg>
                    Upload Image
                    <input
                      type="file"
                      id="uploadFile1"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="w-full flex flex-col md:flex-row items-start md:items-center">
                <label className="text-gray-700 font-semibold text-base w-1/3">
                  CC
                </label>
                <div className="w-full">
                  <input
                    className="md:w-2/3 px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                    type="number"
                    placeholder="Enter CC"
                    {...register("cc", {
                      required: "CC is required",
                      valueAsNumber: true,
                    })}
                  />
                  <p
                    className={`text-red-700 text-xs italic text-right h-4 mt-1 ${
                      errors.cc ? "block" : "invisible"
                    }`}
                  >
                    {errors.cc?.message}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-start md:items-center">
                <label className="text-gray-700 font-semibold text-base w-1/3">
                  Year
                </label>
                <div className="w-full">
                  <input
                    className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                    type="number"
                    placeholder="Enter year"
                    {...register("year", {
                      required: "Year is required",
                      valueAsNumber: true,
                    })}
                  />
                  <p
                    className={`text-red-700 text-xs italic text-right h-4 mt-1 ${
                      errors.year ? "block" : "invisible"
                    }`}
                  >
                    {errors.year?.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center mt-4">
              <label className="text-gray-700 font-semibold text-base w-full md:w-32">
                Description
              </label>
              <div className="w-full">
                <textarea
                  className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
                  placeholder="Enter description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <p
                  className={`text-red-700 text-xs italic text-right h-4 mt-1 ${
                    errors.description ? "block" : "invisible"
                  }`}
                >
                  {errors.description?.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 text-sm">
              <button
                type="button"
                onClick={onClose}
                className="focus:outline-none modal-close px-4 bg-gray-500 rounded-none text-white hover:bg-gray-400 hover:border-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="focus:outline-none py-1 bg-orange-600 px-3 ml-3 rounded-none text-white hover:bg-green-600"
              >
                {Car ? "Update Car" : "Add Car"}
              </button>
            </div>
          </form> */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarModal;
