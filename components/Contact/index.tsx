"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/config";

// Define the type for the form data
interface FormData {
  name: string;
  email: string;
  message: string;
  address: string;
  subject: string;
  phonenumber: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    address: "",
    subject: "",
    phonenumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChecked) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    if (Object.values(formData).some((field) => field.trim() === "")) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, "contacts"), formData);
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
        subject: "",
        address: "",
        phonenumber: "",
      });
      setIsChecked(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to send message. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Contact Us
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="text"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    placeholder="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                  ></textarea>
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-between">
                  <div className="mb-4 flex items-center">
                    <input
                      id="terms-checkbox"
                      type="checkbox"
                      name="terms"
                      className="peer sr-only"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <span className="checkbox-icon"></span>
                    <label
                      htmlFor="terms-checkbox"
                      className="cursor-pointer select-none pl-5"
                    >
                      By clicking, you agree to our terms and consent to cookie usage.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`submit-button ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Find us
              </h2>

              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Location
                </h3>
                <p>Construction House,3rd Floor, Harare CBD Zimbabwe</p>
              </div>
              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Email Address
                </h3>
                <p>
                  <a href="#">codicoglobal@gmail.com</a>
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Phone Number
                </h4>
                <ul>
                  <li><a href="#">+263 78 089 7191</a></li>
                  <li><a href="#">+263 78 864 7705</a></li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .input-field {
          width: 100%;
          border-bottom: 1px solid #ccc;
          background: transparent;
          padding-bottom: 10px;
          outline: none;
        }
        .checkbox-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 1px solid gray;
          background: #f4f4f4;
          margin-right: 10px;
          cursor: pointer;
        }
        .submit-button {
          background-color: black;
          color: white;
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: bold;
          transition: 0.3s;
        }
        .submit-button:hover {
          background-color: #333;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Contact;