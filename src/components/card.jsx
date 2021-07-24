import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
 base: {
      color: '#fff',
      fontWeight: 500,
      fontSize: '18px',
      fontSmoothing: 'antialiased',
      background: 'transparent',
      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#E25950',
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  },
};

export default function CardInput() {
  return (
    <CardElement options={CARD_ELEMENT_OPTIONS} />
  );
}