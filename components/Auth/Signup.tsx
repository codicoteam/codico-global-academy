"use client";
import { db } from "@/app/config";

import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

async function addDatatoFirestore(firstName, lastName, email, password) {
  try {
    const docRef = await addDoc(collection(db, "message"), {
      firstName,
      lastName,
      email,
      password,
    });
    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (err) {
    console.error("Error adding document:", err);
    return false;
  }
}

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDatatoFirestore(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password,
    );

    if (added) {
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      alert("Data added to Firestore DB!");
    }
  };

  return (
    <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
      >
        <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
            />
          </div>

          <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 hover:bg-gray-800"
          >
            Create Account
          </button>
        </form>
      </motion.div>
    </section>
  );
}
