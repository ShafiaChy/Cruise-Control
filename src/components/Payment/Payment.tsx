import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const location = useLocation();
  const { state } = location;

  // const amount = state?.amount;
  // const carId = state?.carId || "";
  // const startTime = state?.startTime || "";
  console.log("Payment Page State:", state);

  // Extract details from state
  const isRemainderPayment = state?.isRemainderPayment || false;
  const amount = parseInt(state?.amount, 10);
  const carId = state?.carId || "";
  const rentalId = state?.rentalId || "";
  const startTime = state?.startTime || "";

  return (
    <Elements stripe={stripePromise}>
      {/* <CheckoutForm amount={amount} carId={carId} startTime={startTime} /> */}
      {isRemainderPayment ? (
        <CheckoutForm amount={amount} carId={carId} rentalId={rentalId} />
      ) : (
        <CheckoutForm amount={amount} carId={carId} startTime={startTime} />
      )}
    </Elements>
  );
};

export default Payment;
