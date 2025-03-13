"use client";
import { db, auth } from "@/app/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // You'll need to install this package

async function signUpUser(firstName, lastName, email, password) {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Store additional user details in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      email,
    });

    console.log("User signed up & added to Firestore:", user.uid);
    return true;
  } catch (err) {
    console.error("Error signing up:", err.message);
    throw err; // We'll handle the error in the component
  }
}

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    
    // Validate all fields are filled
    const allFieldsFilled = Object.values(formData).every(field => field !== "");
    if (!allFieldsFilled) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Set loading state to change button text
    setIsLoading(true);
    
    try {
      const user =   await signUpUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
      );

      localStorage.setItem("signedUpUser", JSON.stringify(user));

      // Reset form and show success toast
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      toast.success("You have successfully registered!");

      
      // Redirect after a short delay to allow the toast to be seen
      setTimeout(() => {
        router.push("/");
      }, 1500);
      
    } catch (error) {
      // Show error message
      toast.error(error.message || "Registration failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
        >
          <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white">
            Sign Up Account
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
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
                required
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
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark dark:focus:border-manatee"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 hover:bg-gray-800 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}