import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFrom from "./CheckoutFrom";


//add Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);


const Payment = () => {
    return (
        <div>
            <h1 className="text-center text-4xl font-bold my-5">Payment</h1>
            <p className='my-5 w-9/12 mx-auto text-center font-bold'>Please Pay Application Fees and Apply For Scholarship.</p>
            <div className="w-11/12 md:w-10/12 mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutFrom></CheckoutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;