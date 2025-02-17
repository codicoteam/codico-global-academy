"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/config";

const AddCourse = () => {
  const [data, setData] = useState({
    courseImage: "", // Changed to text input
    title: "",
    description: "",
    category: "",
   
    duration: "",
    price: "",
    currency: "USD",
    level: "",
   
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
      await addDoc(collection(db, "courses"), data);
      alert("Course added successfully!");
      setData({
        courseImage: "",
        title: "",
        description: "",
        category: "",
     
        duration: "",
        price: "",
        currency: "USD",
        level: "",
      
      });
    } catch (error) {
      console.error("Error adding course:", error);
      setError("Failed to add course. Please try again.");
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
              <input type="text" name="courseImage" placeholder="Course Image URL" value={data.courseImage} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="title" placeholder="Course Title" value={data.title} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <textarea name="description" placeholder="Description" value={data.description} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="category" placeholder="Category" value={data.category} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
            </div>
            <div className="flex flex-col gap-4">
              <input type="text" name="duration" placeholder="Duration" value={data.duration} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="price" placeholder="Price" value={data.price} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="currency" placeholder="Currency" value={data.currency} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="level" placeholder="Level" value={data.level} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg font-medium text-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {loading ? "Submitting..." : "Submit Course"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AddCourse;
