import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  useCreatePaymentIntentMutation,
  useSavePaymentDataMutation,
  useSaveRemainderPaymentMutation,
} from "../../redux/features/payment/paymentApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "sonner";
import PaymentSuccess from "./Success";

type CheckoutFormProps = {
  amount: number;
  carId: string;
  rentalId?: string;
  startTime?: string;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  carId,
  rentalId,
  startTime,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [savePaymentData] = useSavePaymentDataMutation();
  const [saveRemainderPayment] = useSaveRemainderPaymentMutation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const [cardError, setCardError] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.auth);

  const userId = user?.id || "";
  const email = user?.email || "";

  useEffect(() => {
    if (amount > 0) {
      createPaymentIntent(amount)
        .unwrap()
        .then((data) => {
          setClientSecret(data.data);
          console.log("Client Secret:", data.data);
        })
        .catch((error) => {
          console.error("Failed to create payment intent:", error);
          setCardError("Failed to create payment intent");
        });
    }
  }, [amount, createPaymentIntent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Ensure Stripe and elements are loaded
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return; // Ensure card element is available
    }

    setProcessing(true);

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      setCardError(paymentMethodError.message || "An error occurred");
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret as string, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setCardError(confirmError.message || "Payment confirmation failed");
      setProcessing(false);
      return;
    }

    try {
      const commonPaymentData = {
        transactionId: paymentIntent?.id,
        amount,
        carId,
        userId,
        email,
      };
      console.log(commonPaymentData);

      // const completePaymentData = startTime
      //   ? { ...commonPaymentData, startTime }
      //   : commonPaymentData;
      const firstPaymentData = {
        ...commonPaymentData,
        startTime: startTime as string,
      };

      console.log(firstPaymentData);

      const result = rentalId
        ? await saveRemainderPayment({
            rentalId,
            paymentData: commonPaymentData,
          }).unwrap()
        : await savePaymentData(firstPaymentData).unwrap();

      console.log("Payment saved successfully:", result);
      setTransactionId(paymentIntent.id);
      toast.success("Payment successful!");
    } catch (error) {
      console.error("Error saving payment:", error);
      setCardError("Failed to save payment data");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {transactionId ? (
        <div className="md:w-2/3 w-full mx-auto my-8 text-center pb-36 px-8">
          {/* <p className="text-green-600 font-semibold">
            Your transaction is completed successfully!
          </p>
          <p className="text-base pt-2 text-gray-300">
            ${amount} has been credited from your account !
            <br />
            Transaction ID # {transactionId}
          </p> */}
          <PaymentSuccess />
        </div>
      ) : (
        <>
          {/* <CardElement
            className="bg-gray-100/90 w-1/2 mx-auto px-8 py-12 mt-12 rounded-lg"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#333",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          /> */}
          <CardElement
            className="w-1/2 mx-auto mt-24 p-4 rounded-none h-24 shadow-md border border-gray-300 bg-white"
            options={{
              style: {
                base: {
                  iconColor: "#c4f0ff",
                  color: "#000000",
                  fontWeight: "500",
                  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                  fontSize: "20px",
                  fontSmoothing: "antialiased",
                  ":-webkit-autofill": {
                    color: "#fce883",
                  },
                  "::placeholder": {
                    color: "#23C050",
                  },
                },
                invalid: {
                  iconColor: "#FFC7EE",
                  color: "#FFC7EE",
                },
                complete: {
                  color: "#4caf50", // Color when the input is complete
                  iconColor: "#4caf50",
                },
              },
              hidePostalCode: true, // Hide the postal code field if not needed
            }}
          />

          <div className="flex justify-center mt-16">
            <button
              type="submit"
              disabled={!stripe || processing}
              className="rounded-none bg-orange-600 hover:outline-none w-1/6 text-white text-xl font-semibold"
            >
              {processing ? "Processing..." : "Pay Now"}
            </button>
          </div>

          {cardError && <p className="text-red-600 mt-6">{cardError}</p>}
        </>
      )}
    </form>
  );
};

export default CheckoutForm;
