import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import {
  Box,
  Button,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";

const Payment = () => {
  const [orderData, setOrderData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(""); // Tracks selected payment method
  const [amountToPay, setAmountToPay] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem("latestOrder")) || {};
    setOrderData(storedOrderData);
    setRemainingAmount(storedOrderData.totalPrice || 0); // Initialize remaining amount

    // Load Paystack script for Paystack option
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    if (value <= remainingAmount) {
      setAmountToPay(value);
    } else {
      toast({
        title: "Invalid Amount",
        description: "Amount entered exceeds the remaining balance.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method !== "paystack-installment") {
      setAmountToPay(0); // Reset amount to pay if not installment
      setRemainingAmount(orderData.totalPrice); // Reset remaining amount
    }
  };

  const payWithPaystack = (e) => {
    e.preventDefault();

    if (amountToPay <= 0 && paymentMethod === "paystack-installment") {
      toast({
        title: "Invalid Payment Amount",
        description: "Please enter a valid amount to pay.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      let handler = window.PaystackPop.setup({
        key: "pk_live_5764b24e00d2d489b3dd51937033f86f4661d7c5", // Replace with your actual Paystack public key
        email: user?.email || document.getElementById("email-address").value,
        amount: Math.round(amountToPay * 100), // Convert to kobo
        currency: "GHS",
        ref: "" + Math.floor(Math.random() * 1000000000 + 1), // Generate a pseudo-unique reference
        onClose: function () {
          toast({
            title: "Payment Cancelled",
            description: "You closed the payment window.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        },
        callback: function (response) {
          let message = "Payment complete! Reference: " + response.reference;
          toast({
            title: "Payment Successful",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          paystackPaymentHandler(response);
        },
      });

      handler.openIframe();
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An error occurred while processing the payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const paystackPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const order = {
      cart: orderData.cart,
      shippingAddress: orderData.shippingAddress,
      user: user && user,
      totalPrice: amountToPay, // Only record the amount paid in this installment
      paymentInfo: {
        id: paymentInfo.reference,
        status: "succeeded",
        type: "Paystack",
      },
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        navigate("/order/success");
        toast({
          title: "Order Successful",
          description: "Your order has been placed successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      })
      .catch((err) => {
        toast({
          title: "Order Failed",
          description: "There was an issue creating your order.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleCashOnDelivery = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const order = {
      cart: orderData.cart,
      shippingAddress: orderData.shippingAddress,
      user: user && user,
      totalPrice: orderData.totalPrice,
      paymentInfo: {
        status: "pending",
        type: "Cash on Delivery",
      },
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        navigate("/order/success");
        toast({
          title: "Order Successful",
          description: "Your order has been placed successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      })
      .catch((err) => {
        toast({
          title: "Order Failed",
          description: "There was an issue creating your order.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "cod") {
      handleCashOnDelivery();
    } else if (paymentMethod === "paystack" || paymentMethod === "paystack-installment") {
      payWithPaystack(e);
    } else {
      toast({
        title: "Payment Method Not Selected",
        description: "Please select a payment method.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="full" p={8} bg="gray.100" minH="100vh">
      <Box w={["90%", "70%"]} mx="auto" p={5} bg="white" borderRadius="md">
        <RadioGroup onChange={handlePaymentMethodChange} value={paymentMethod}>
          <Stack direction="column">
            <Radio value="cod">Cash on Delivery</Radio>
            <Radio value="paystack">Pay with Paystack (Full Payment)</Radio>
            <Radio value="paystack-installment">Pay Installment with Paystack</Radio>
          </Stack>
        </RadioGroup>

        {paymentMethod === "paystack-installment" && (
          <Box mt={4}>
            <Input
              placeholder="Enter amount to pay"
              type="number"
              value={amountToPay}
              onChange={handleAmountChange}
            />
            <Box mt={2}>Remaining Amount: GHS {remainingAmount}</Box>
          </Box>
        )}

        <Button
          onClick={handleSubmit}
          colorScheme="red"
          mt={5}
          width="full"
          size="lg"
        >
          Proceed to Pay
        </Button>
      </Box>
    </Box>
  );
};

export default Payment;
