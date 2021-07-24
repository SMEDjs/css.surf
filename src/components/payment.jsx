import React, { useState } from 'react'
import { css } from "@emotion/css"
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useAuth } from "../hooks/use-auth.jsx";
import CardInput from './card.jsx';
import { Div, CardPremium } from "../styles/styled";
import { useToast,  Modal, ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, useDisclosure, useColorModeValue} from "@chakra-ui/react";
export const Payment = ((props) => {
  const colorText = useColorModeValue("#374157c7", "#bfbfbfc7")
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
            <div className="error">payment are not implemented for now ...</div>
            <input className={`email`} placeholder="email"></input>
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
        <Div d="flex" jc="center" ai="center" ff="column">
          <div className='bigText'>
            unlock <span className={`premium ${css`font-size: inherit;`}`}>premium</span> subscription
          </div>
          <Div d="flex" w="100%" jc="center" className={css`@media (max-width: 800px) {flex-flow: column;align-items: center;}`}>
            <div className={css`@media (max-width: 800px) {width: 60vw;}`}>
              <CardPremium d="flex">
                 <Div ps="center" fs="23px">
                    <i class="fas fa-pencil-alt pencil"></i>
                  </Div>
                <Div>
                <Div fw="500">
                    custom text
                </Div>
                <Div c={colorText} fs="16px">
                  use any text on your element
                </Div>
                </Div>
              </CardPremium>
              <CardPremium d="flex">
                <Div ps="center" fs="23px">
                  <i class="fas fa-palette palette"></i>
                </Div>
                <Div>
                <Div fw="500">
                    custom emojis
                </Div>
                <Div c={colorText} fs="16px">
                  unlock more emojis
                </Div>
                </Div>
              </CardPremium>
            </div>
            <div className={css`@media (max-width: 800px) {width: 60vw;}`}>
              <CardPremium d="flex">
                <Div ps="center" fs="23px">
                  <i class="fas fa-icons icons"></i>
                </Div>
                <Div>
                  <Div fw="500">
                      custom icons
                  </Div>
                  <Div c={colorText} fs="16px">
                    unlock more icons
                  </Div>
                </Div>
              </CardPremium>
              <CardPremium d="flex">
                <Div ps="center" fs="23px">
                  <i class="fas fa-heart heart"></i>
                </Div>
                <Div>
                <Div fw="500">
                    support
                </Div>
                <Div c={colorText} fs="16px">
                  support the website
                </Div>
                </Div>
              </CardPremium>
            </div>
          </Div>
          <button onClick={onOpen} className={`subscription`}>Subscription</button>
        </Div>
      </div>
    </div>
  );
})