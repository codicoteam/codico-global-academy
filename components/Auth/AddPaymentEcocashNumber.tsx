"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/config";

const AddPaymentPageUsingNumberEcocash = () => {
  const [data, setData] = useState({
    courseImage: "", // Changed to text input
    title: "",
    description: "",
    category: "",
   
    duration: "",
    price: "",
    currency: "USD",
    level: "",

    customerName: "",
    customerEmail: "", 
    customerPhoneNumber: "", 
    paymentStatus: "",
    showPayment: "",
    isPaid: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Send a request to the payment endpoint
      const response = await fetch("https://codico-global-academy-backend.onrender.com/api/v1/pay_course/mobile-ecocash-paynow-me", {
        method: "POST", // Assuming it's a POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send your data as the request body
      });
  
      if (!response.ok) {
        throw new Error("Payment request failed");
      }
  
      const responseData = await response.json();
  
      // Assuming the response contains a success message or something like that
      if (responseData.success) {
        alert("Payment processed successfully!");
      } else {
        alert("Payment failed. Please try again.");
      }
  
  
      // Reset the form data
      setData({
        courseImage: "", 
        title: "",
        description: "",
        category: "",
        duration: "",
        price: "",
        currency: "USD",
        level: "",
        customerName: "",
        customerEmail: "", 
        customerPhoneNumber: "", 
        paymentStatus: "Pending",
        showPayment: "false",
        isPaid: "false",
      });
    } catch (error) {
      console.error("Error making payment:", error);
      setError("Failed to make the payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="pb-20 pt-40 lg:pb-30 lg:pt-50 xl:pb-35 xl:pt-55 bg-gray-100 dark:bg-gray-900">
      <div className="relative z-1 mx-auto max-w-4xl px-8 py-10 lg:px-16 lg:py-14 xl:px-20 xl:py-16 bg-white dark:bg-black rounded-xl shadow-lg">
        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-lg"
        >
          <h2 className="mb-10 text-center text-4xl font-bold text-black dark:text-white">
            Add Course
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <input type="text" name="customerPhoneNumber" placeholder="Customer PhoneNumber" value={data.customerPhoneNumber} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg font-medium text-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {loading ? "Submitting..." : "Submit Payment"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AddPaymentPageUsingNumberEcocash;
