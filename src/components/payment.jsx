
import React, { useState } from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useAuth } from "../hooks/use-auth.jsx";
import CardInput from './card.jsx';
import { Input, useToast,  Modal, ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, useDisclosure} from "@chakra-ui/react";
export const Payment = ((props) => {
  const { subscription } = useAuth();
  const [email, setEmail] = useState('');
  const toast = useToast()
  const stripe = useStripe();
  const elements = useElements();
const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (result.error) {
      console.log("tg")
      toast({ title: `error !`, description: result.error.message, position: "top-right", duration: 3000, status: "error", isClosable: true })
    } else {
      const res = await subscription(result.paymentMethod.id, email);
      if(res.error) return toast({ title: `error !`, description: res.message ? res.message : "something wrong happend !", position: "top-right", duration: 3000, status: "error", isClosable: true })
      const {client_secret, status} = res;

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function(result) {
          if (result.error) {
            toast({ title: `error !`, description: result.error, position: "top-right", duration: 3000, status: "error", isClosable: true })
          } else {
            toast({ title: `payment received !`, position: "top-right", duration: 3000, status: "success", isClosable: true })
          }
        });
      } else {
        toast({ title: `payment received !`, position: "top-right", duration: 3000, status: "success", isClosable: true })
      }
    }
  };

  return (
    <div >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><span className="premium">Premium</span> subscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <div>
            <CardInput />
          </div>
          </ModalBody>

          <ModalFooter flexFlow="column">
            <button className="pay" variant="contained" color="primary" onClick={handleSubmitSub}>Pay 3€</button>
            <div className="stripe">
              Payment powered by 
              <a href="https://stripe.com/" target="_blank" className="stripeIcon">
                <i class="fab fa-stripe"></i>
              </a>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>
        
        <button onClick={onOpen}>Subscription</button>
      </div>
    </div>
  );
})