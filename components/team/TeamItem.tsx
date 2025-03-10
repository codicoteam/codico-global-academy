"use client";

import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Blog, Team } from "@/types/team";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/app/config";
import toast from "react-hot-toast";
import { log } from "node:console";

const Teamitem = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Payment flow states
  const [paymentStep, setPaymentStep] = useState<
    "initial" | "options" | "ecocash"
  >("initial");
  const [ecocashNumber, setEcocashNumber] = useState("");

  const isMounted = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMounted.current) return;

    isMounted.current = true;

    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Courses Data: ", coursesData);

        const uniqueCourses = Array.from(
          new Map(coursesData.map((item) => [item.id, item])).values(),
        );

        console.log("Unique Courses Data: ", uniqueCourses);

        setCourses(uniqueCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setDialogOpen(false);
        // Reset payment step when dialog closes
        setPaymentStep("initial");
        setEcocashNumber("");
      }
    };

    if (dialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dialogOpen]);

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setDialogOpen(true);
    // Reset payment step when opening a new course
    setPaymentStep("initial");
    setEcocashNumber("");
  };

  const handleEnrollClick = () => {
    setPaymentStep("options");
  };

  const handleEcocashClick = () => {
    setPaymentStep("ecocash");
  };

  const handlePaynowClick = async() => {

    try {
      // Prepare the payment data
      const paymentPaynowData = {
        customerName: "John Doe",
        customerEmail: "codicoglobal@gmail.com",
        customerPhoneNumber: "+123456789",
        category: "Programming",
        courseImage: "https://example.com/course-image.jpg",
        currency: "USD",
        description: "A comprehensive course on JavaScript.",
        duration: "3 months",
        level: "Beginner",
        price: 100,
        title: "JavaScript Basics",
        paymentStatus: "Pending",
        showPayment: false,
        isPaid: false
      };

      // Make the API call
      const response = await fetch(
        "https://codico-global-academy-backend.onrender.com/api/v1/pay_course/web-paynow-me",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentPaynowData),
        },
      );

      const responseAPynowData = await response.json();
      console.log("Payment API response:", responseAPynowData);


      const paynowUrl = responseAPynowData.redirectURL;
      window.open(paynowUrl, "_blank");

   
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(
        error.message ||
          "There was an error processing your payment. Please try again.",
      );
      setIsLoading(false);
    }

  
  };

  const handleEcocashPayment = async () => {
    if (
      ecocashNumber &&
      ecocashNumber.length === 10 &&
      /^0[7|8][0-9]{8}$/.test(ecocashNumber)
    ) {
      console.log(
        `Processing EcoCash payment for course: ${selectedCourse?.id} with number: ${ecocashNumber}`,
      );
      setIsLoading(true);

      try {
        // Prepare the payment data
        const paymentData = {
          customerName: "John Doe",
          customerEmail: "codicoglobal@gmail.com",
          customerPhoneNumber: ecocashNumber, // Using the entered EcoCash number
          category: "Programming",
          courseImage: "https://example.com/course-image.jpg",
          currency: "USD",
          description: "A comprehensive course on JavaScript.",
          duration: "3 months",
          level: "Beginner",
          price: 100,
          title: "JavaScript Basics",
          paymentStatus: "Pending",
          showPayment: false,
          isPaid: false,
        };

        // Make the API call
        const response = await fetch(
          "https://codico-global-academy-backend.onrender.com/api/v1/pay_course/mobile-ecocash-paynow-me",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          },
        );

        const responseData = await response.json();
        console.log("Payment API response:", responseData);

        if (responseData.pollUrl) {
          // Create a toast ID to manage the loading toast
          const toastId = toast.loading(
            `Payment request sent to EcoCash number: ${ecocashNumber}. Please check your phone.`,
          );


              console.log( `pollurl ${responseData.pollUrl}`);

          // Function to check payment status
          const checkPaymentStatus = async () => {
            
            console.log( `pollurl  try ${responseData.pollUrl}`);

            try {



              const checkPollUrlData = {
                pollUrl: responseData.pollUrl,
              };
      
              // Make the API call
              const responseCheckUrl = await fetch(
                "https://codico-global-academy-backend.onrender.com/api/v1/pay_course/check-status",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(checkPollUrlData),
                },
              );
              const responseDataJson = await responseCheckUrl.json();



              if (responseDataJson.status === "paid" || responseDataJson.status === "success") {
                toast.dismiss(toastId); // Dismiss loading toast
                toast.success(
                  "Payment successful! Your course is now available.",
                );
                setDialogOpen(false);
                setPaymentStep("initial");
                setEcocashNumber("");
                setIsLoading(false);
                return true; // Stop polling
              } else if (responseDataJson.status === "cancelled") {
                toast.dismiss(toastId); // Dismiss loading toast
                toast.error(
                  "Payment was cancelled. Please try again if you want to purchase the course.",
                );
                setIsLoading(false);
                return true; // Stop polling
              } else if (responseDataJson.status === "Sent") {
                // Continue polling without showing new toast each time
                return false;
              } else {
                // For other statuses (Pending, Created, etc.)
                return false; // Continue polling
              }
            } catch (error) {
              console.error("Error checking payment status:", error);
              return false; // Continue polling on error
            }
          };

          // Poll the status URL every 5 seconds for up to 3 minutes (36 attempts)
          let attempts = 0;
          const maxAttempts = 8; // 3 minutes with 5-second intervals
          const pollInterval = 3000; // 5 seconds

          const pollTimer = setInterval(async () => {
            attempts++;
            const shouldStop = await checkPaymentStatus();

            if (shouldStop || attempts >= maxAttempts) {
              clearInterval(pollTimer);

              if (attempts >= maxAttempts && !shouldStop) {
                // If we've reached max attempts without a conclusive status
                toast.dismiss(toastId);
                toast.error(
                  "Payment confirmation timed out. If you completed the payment, please contact support.",
                );
                setIsLoading(false);
              }
            }
          }, pollInterval);
        } else {
          toast.error("Invalid payment response. Please try again.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        toast.error(
          error.message ||
            "There was an error processing your payment. Please try again.",
        );
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid Zimbabwe EcoCash number (e.g., 0771234567)");
    }
  };

  const handleBackToOptions = () => {
    setPaymentStep("options");
    setEcocashNumber("");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {courses.length === 0 ? (
        <p className="text-center text-gray-500">No courses available.</p>
      ) : (
        courses.map((course) => (
          <motion.div
            key={course.id}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="animate_top cursor-pointer rounded-lg bg-white p-4 pb-9 shadow-solid-8 transition-shadow duration-300 hover:shadow-lg dark:bg-blacksection"
            onClick={() => handleCourseClick(course)}
          >
            <div className="relative block aspect-[368/239]">
              <Image
                src={course.courseImage}
                alt={course.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div className="px-4">
              <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
                {course.title.length > 40
                  ? `${course.title.slice(0, 40)}...`
                  : course.title}
              </h3>
              <p className="line-clamp-3">{course.description}</p>
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <span className="mr-1">⏱️</span>
                <span>{course.duration}</span>
                <span className="mx-2">•</span>
                <span className="mr-1">📊</span>
                <span>{course.level}</span>
              </div>
              <p className="mt-3 font-bold">
                {course.currency} {course.price}
              </p>
            </div>
          </motion.div>
        ))
      )}

      {/* Custom Dialog */}
      {dialogOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div
            ref={dialogRef}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white dark:bg-gray-800"
          >
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                  {selectedCourse.title}
                </h2>
                <p className="mt-2 font-semibold text-primary">
                  {selectedCourse.currency} {selectedCourse.price}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => {
                  setDialogOpen(false);
                  setPaymentStep("initial");
                }}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="text-2xl">×</span>
              </button>

              {/* Image */}
              <div className="relative mb-6 h-64 w-full">
                <Image
                  src={selectedCourse.courseImage}
                  alt={selectedCourse.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Course details grid */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="flex items-center rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <span className="mr-2 text-lg">⏱️</span>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Duration
                    </p>
                    <p className="font-medium text-black dark:text-white">
                      {selectedCourse.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                  <span className="mr-2 text-lg">📊</span>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Level
                    </p>
                    <p className="font-medium text-black dark:text-white">
                      {selectedCourse.level}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-medium text-black dark:text-white">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedCourse.description}
                </p>
              </div>

              {/* What you'll learn */}
              {selectedCourse.highlights && (
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-medium text-black dark:text-white">
                    What You'll Learn
                  </h3>
                  <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {selectedCourse.highlights?.map(
                      (highlight: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-primary">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {highlight}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              {/* Payment Section */}
              <div className="mt-6">
                {/* Initial Enroll Button */}
                {paymentStep === "initial" && (
                  <button
                    onClick={handleEnrollClick}
                    className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white transition duration-200 hover:bg-primary/90"
                  >
                    Enroll Now • {selectedCourse.currency}{" "}
                    {selectedCourse.price}
                  </button>
                )}

                {/* Payment Options */}
                {paymentStep === "options" && (
                  <div className="space-y-4">
                    <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
                      Select Payment Method
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={handleEcocashClick}
                        className="flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition duration-200 hover:bg-green-700"
                      >
                        <span className="mr-2">📱</span> EcoCash
                      </button>
                      <button
                        onClick={handlePaynowClick}
                        className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition duration-200 hover:bg-blue-700"
                      >
                        <span className="mr-2">💳</span> PayNow
                      </button>
                    </div>
                  </div>
                )}

                {/* EcoCash Payment Form */}
                {paymentStep === "ecocash" && (
                  <div className="space-y-4">
                    <h3 className="mb-2 text-lg font-medium text-black dark:text-white">
                      Pay with EcoCash
                    </h3>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      Enter your Zimbabwe EcoCash number to complete payment.
                    </p>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        EcoCash Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 0771234567"
                        value={ecocashNumber}
                        onChange={(e) => setEcocashNumber(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enter a valid Zimbabwe mobile number (e.g., 0771234567)
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={handleBackToOptions}
                        className="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-800 transition duration-200 hover:bg-gray-300"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleEcocashPayment}
                        className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition duration-200 hover:bg-green-700"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="h-5 w-5 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              ></path>
                            </svg>
                            Processing Payments...
                          </>
                        ) : (
                          `Pay ${selectedCourse.currency} ${selectedCourse.price}`
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Teamitem;
