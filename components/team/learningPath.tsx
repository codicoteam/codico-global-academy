"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LearningPathDetails from "@/app/(site)/learningPathDetails/page";

interface ComponentSubtitle {
  combsubttle: string;
  combsubttlelevel: string;
  compsubttlehr: string;
}

interface ComponentLearning {
  comptitle: string;
  compdescription: string;
  combsub: ComponentSubtitle[];
}

interface LearningPath {
  id: number;
  title: string;
  description: string;
  componentsLearning: ComponentLearning[];
  level: string;
  price: number;
  currency: string;
  learningPathImage: string;
}

const LearningPathItem = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const learningPaths: LearningPath[] = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript.",
      componentsLearning: [
        {
          comptitle: "HTML Fundamentals",
          compdescription: "Learn the structure and basics of HTML",
          combsub: [
            {
              combsubttle: "HTML Basics",
              combsubttlelevel: "beginner",
              compsubttlehr: "4"
            },
            {
              combsubttle: "HTML5 Elements",
              combsubttlelevel: "beginner",
              compsubttlehr: "4"
            },
          ]
        },
        {
          comptitle: "CSS Styling",
          compdescription: "Master CSS for beautiful web designs",
          combsub: [
            {
              combsubttle: "CSS Selectors",
              combsubttlelevel: "beginner",
              compsubttlehr: "4"
            },
            {
              combsubttle: "Responsive Design",
              combsubttlelevel: "beginner",
              compsubttlehr: "4"
            },
          ]
        },
      ],
      level: "Beginner",
      price: 99,
      currency: "$",
      learningPathImage: "https://aamokxxnfpmdpayvmngs.supabase.co/storage/v1/object/public/academy//artificalIntellince.png",
    },

    {
      id: 2,
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript.",
      componentsLearning: [
        {
          comptitle: "HTML Fundamentals",
          compdescription: "Learn the structure and basics of HTML",
          combsub: [
            {
              combsubttle: "HTML Basics",
              combsubttlelevel: "beginner",
              compsubttlehr: "4"
            },
            {
              combsubttle: "HTML5 Elements",
              combsubttlelevel: "beginner",
              compsubttlehr: "4"
            },
          ]
        },
        {
          comptitle: "CSS Styling",
          compdescription: "Master CSS for beautiful web designs",
          combsub: [
            {
              combsubttle: "CSS Selectors",
              combsubttlelevel: "beginner",
              compsubttlehr: "4"
            },
            {
              combsubttle: "Responsive Design",
              combsubttlelevel: "beginner",
              compsubttlehr: "4"
            },
          ]
        },
      ],
      level: "Beginner",
      price: 99,
      currency: "$",
      learningPathImage: "https://aamokxxnfpmdpayvmngs.supabase.co/storage/v1/object/public/academy//artificalIntellince.png",
    },
    // ... other learning paths remain the same
  ];

  // Handle click on a learning path
  const handleLearningPathClick = (path: LearningPath) => {
    setSelectedPath(path);
  };

  // Handle going back to the list
  const handleBackToList = () => {
    setSelectedPath(null);
  };

  // If a path is selected, show details
  if (selectedPath) {
    return (
      <LearningPathDetails 
        learningPath={selectedPath} 
        onBack={handleBackToList} 
      />
    );
  }

  // Render the list of learning paths
  return (
    <>
     {learningPaths.map((path) => (
        <motion.div
          key={path.id}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="animate_top cursor-pointer rounded-lg bg-white p-4 pb-9 shadow-solid-8 transition-shadow duration-300 hover:shadow-lg dark:bg-blacksection"
          
          onClick={() => handleLearningPathClick(path)}
        >
          <div className="relative block aspect-[368/239]">
            <Image
              src={path.learningPathImage}
              alt={path.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="px-4">
            <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
              {path.title.length > 40
                ? `${path.title.slice(0, 40)}...`
                : path.title}
            </h3>
            <p className="line-clamp-3">{path.description}</p>
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <span className="mr-1">⏱️</span>
              <span className="mx-2">•</span>
              <span className="mr-1">📊</span>
              <span>{path.level}</span>
            </div>
            <p className="mt-3 font-bold">
              {path.currency} {path.price}
            </p>
          </div>
        </motion.div>
      ))}
    </>
     
  );
};

export default LearningPathItem;