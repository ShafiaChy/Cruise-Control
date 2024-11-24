import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="bg-transparent  flex items-center justify-center">
      <div className="bg-white/0 p-6 rounded-none shadow-xl md:mx-auto">
        <FaCheckCircle className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center text-white ">
          <h3 className="md:text-4xl font-teko text-base font-medium tracking-wide">
            Payment Done!
          </h3>
          <p className="text-gray-200 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <Link
              to="/"
              className="px-12 bg-custom-green hover:bg-green-600 text-white font-semibold py-3 rounded-none focus:outline-none"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
