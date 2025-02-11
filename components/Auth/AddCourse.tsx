"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const AddCourse = () => {
  const [data, setData] = useState({
    courseImage: null,
    title: "",
    description: "",
    category: "",
    instructor: {
      name: "",
      email: "",
      experience: "",
    },
    duration: "",
    price: "",
    currency: "USD",
    level: "",
    mode: "",
    prerequisites: "",
    syllabus: "",
    enrollment_status: "Open",
    certification: {
      provided: false,
      certificate_name: "",
      issuing_body: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("instructor.")) {
      const field = name.split(".")[1];
      setData((prev) => ({
        ...prev,
        instructor: { ...prev.instructor, [field]: value },
      }));
    } else if (name.includes("certification.")) {
      const field = name.split(".")[1];
      setData((prev) => ({
        ...prev,
        certification: { ...prev.certification, [field]: value },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setData((prev) => ({ ...prev, courseImage: e.target.files[0] }));
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
          <form className="space-y-6">
            <div className="flex flex-col gap-4">
              <input type="file" name="courseImage" onChange={handleFileChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="title" placeholder="Course Title" value={data.title} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <textarea name="description" placeholder="Description" value={data.description} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="category" placeholder="Category" value={data.category} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="instructor.name" placeholder="Instructor Name" value={data.instructor.name} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="email" name="instructor.email" placeholder="Instructor Email" value={data.instructor.email} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="instructor.experience" placeholder="Instructor Experience" value={data.instructor.experience} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="duration" placeholder="Duration" value={data.duration} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="number" name="price" placeholder="Price" value={data.price} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="currency" placeholder="Currency" value={data.currency} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="level" placeholder="Level" value={data.level} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
              <input type="text" name="mode" placeholder="Mode" value={data.mode} onChange={handleChange} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800" />
            </div>
            
            <button className="w-full py-3 bg-black text-white rounded-lg font-medium text-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
              Submit Course
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AddCourse;
