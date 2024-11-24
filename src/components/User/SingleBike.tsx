import { Link } from "react-router-dom";
import { TBike } from "../../types/bike";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

const imageUrl =
  "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW90b3JiaWtlfGVufDB8fDB8fHww";

type Props = {
  bike: TBike;
};

const SingleBike: React.FC<Props> = ({ bike }) => {
  const isUser = useAppSelector(useCurrentToken);

  return (
    <div className="mx-auto mt-0 w-[250px] h-72 transform overflow-hidden bg-white dark:bg-black/80 shadow-md duration-300 hover:shadow-lg">
      <img
        className="h-44 w-full  hover:scale-110 transition-transform duration-500 object-cover object-center"
        src={bike.image || imageUrl}
        alt={bike.name}
      />
      <div className=" px-2 flex flex-col justify-between items-baseline ">
        <h2 className=" w-full py-1 text-base font-medium dark:text-white text-gray-900 text-wrap">
          {bike.name}
        </h2>
      </div>
      <div className="flex w-full flex-row items-start   space-x-1 py-1  border-b border-custom-green/60 ">
        <span className="px-2 py-1 bg-custom-green text-white text-xs rounded-full">
          {bike.brand}
        </span>
        <span className="px-2 py-1 bg-custom-green text-white text-xs rounded-full  ">
          {bike.model}
        </span>
      </div>

      <div className="p-2">
        <div className="flex justify-between items-center">
          <p className="mr-2 text-lg font-semibold text-white/80 ">
            ${bike.pricePerHour.toFixed(2)}
          </p>

          <Link
            to={isUser ? `/bike-details/${bike._id}` : "/login"}
            className="relative px-2 py-1 text-sm rounded-none bg-white isolation-auto z-10 border border-gray-900 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:bg-custom-green before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBike;
