import * as React from "react";


import { Payment } from "../components/payment.jsx"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51IcIVbJoNzUZaMFiMkhhTJr9xkl0tB3EyaGJGXaF1j9ldFsPgufdtoNXymwxiim02pT1tG6GRwh0Nug59OXWADfk00afJfuF4h");
import { ElementHelmet } from "../components/elementHelmet";
export default function Premium() {
  return (
    <>
      <ElementHelmet t={`premium`} d="premium subscription page"></ElementHelmet>
      <div>
        <Elements stripe={stripePromise}> 
          <Payment></Payment>
        </Elements>
      </div>
    </>
  );
}