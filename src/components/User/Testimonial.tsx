/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";

import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { TReview } from "../../types/review";
import { useCreateReviewMutation } from "../../redux/features/reviews/reviewApi";



 
const Testimonial = () => {
    const [createReview] = useCreateReviewMutation();
    const [image, setImage] = useState<File | null>(null);
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/upload`;
      const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const isUser = useAppSelector(useCurrentUser);
    const [formData, setFormData] = useState<Omit<TReview, "_id">>({
        name: "",
        userId:"",
        designation: "",
        picture: null, // Initialize as null
        review: "",
        rating: 0,
      });

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, review: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value; // Directly access value from e.target
    if (value) {
      setFormData({ ...formData, rating: Number(value) });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.target as HTMLFormElement); // Get the form data
    let imageUrl;
    if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

    const reviewData: Omit<TReview, "_id"> = {
      name: formData.get("name") as string,
      userId:isUser?.id as string,
      designation: formData.get("designation") as string,
      picture: imageUrl,
      review: formData.get("review") as string,
      rating: Number(formData.get("rating")),
    };
    
    console.log("Form submitted:", reviewData.picture);
  
    try {
      await createReview(reviewData).unwrap();
      toast.success("Review submitted successfully!", {
        duration: 2000,
        className: "text-orange-600",
      });
    } catch (err: any) {
      console.log(err);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Testimonial Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          
          <label
                    htmlFor="uploadFile1"
                    className=" bg-white text-gray-500 font-semibold text-base rounded max-w-md h-24 md:h-32 flex flex-col items-center justify-center cursor-pointer border border-gray-300 border-dashed w-full"
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
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Review</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleTextAreaChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleSelectChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="0">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testimonial;
