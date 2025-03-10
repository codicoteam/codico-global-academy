"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/config";

interface CourseDetailsProps {
  image: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: string;
  level: string;
}


const CourseDetailscomp: React.FC<CourseDetailsProps> = (
  {
    image,
    title,
    description,
    category,
    duration,
    price,
    level
  }
) => {


  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
    <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg mb-6" />
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-gray-700 mb-6">{description}</p>
    <div className="grid grid-cols-2 gap-4 text-lg">
      <div>
        <strong>Category:</strong> {category}
      </div>
      <div>
        <strong>Duration:</strong> {duration}
      </div>
      <div>
        <strong>Price:</strong> {price}
      </div>
      <div>
        <strong>Level:</strong> {level}
      </div>
    </div>
    <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
      Enroll Now
    </button>
  </div>
  );
};

export default CourseDetailscomp;
