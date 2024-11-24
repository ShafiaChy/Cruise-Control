import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  bikeId: string;
}

const PaymentModal = ({ isOpen, setIsOpen, bikeId }: PaymentModalProps) => {
  const [startTime, setStartTime] = useState("");
  const navigate = useNavigate();
  const isUser = useAppSelector(useCurrentUser);
  console.log(isUser?.role);

  const formatDateTimeForInput = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  const getMinDateTime = () => {
    const now = new Date();
    return formatDateTimeForInput(now);
  };

  const handleProceedToPayment = () => {
    const bookingData = {
      bikeId,
      startTime,
      amount: 100,
    };

    console.log("Booking Data:", bookingData);

    navigate(`../${isUser?.role}/dashboard/payment`, { state: bookingData });
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateTime = new Date(e.target.value).toISOString();
    setStartTime(selectedDateTime);
    console.log("Selected Start Time:", selectedDateTime);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <h3 className="text-4xl font-medium font-teko text-center mb-6">
              Book Your Ride
            </h3>
            <div className="relative z-10">
              <div className="mb-4">
                <label className="block text-white mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  min={getMinDateTime()}
                  value={
                    startTime ? formatDateTimeForInput(new Date(startTime)) : ""
                  }
                  onChange={handleDateTimeChange}
                  className="w-full p-2 border-none focus:outline-none rounded-none text-gray-800  bg-green-50/50"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded-none hover:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToPayment}
                  className="bg-white hover:opacity-90 transition-opacity text-custom-green font-semibold w-full py-2  rounded-none hover:outline-none"
                  disabled={!startTime}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
