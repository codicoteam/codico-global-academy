'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, BookOpen, Play } from 'lucide-react';

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

interface LearningPathDetailsProps {
  learningPath: LearningPath;
  onBack: () => void;
}

const LearningPathDetails: React.FC<LearningPathDetailsProps> = ({ 
  learningPath, 
  onBack 
}) => {
  const totalHours = learningPath.componentsLearning.reduce((total, component) => {
    return total + component.combsub.reduce((compTotal, sub) => {
      return compTotal + parseFloat(sub.compsubttlehr);
    }, 0);
  }, 0);

  return (
    <>
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="mb-6 flex items-center text-gray-600 hover:text-primary"
      >
        <ChevronRight className="mr-2 rotate-180" />
        Back to Learning Paths
      </button>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-8 mb-12"
      >
        {/* Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={learningPath.learningPathImage}
            alt={learningPath.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Path Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{learningPath.title}</h1>
          <p className="text-gray-600 mb-6">{learningPath.description}</p>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Clock className="mr-2 text-primary" size={20} />
              <span>{totalHours} Total Hours</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 text-primary" size={20} />
              <span>{learningPath.level} Level</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">
              {learningPath.currency}{learningPath.price}
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition flex items-center">
              <Play className="mr-2" size={20} />
              Start Learning
            </button>
          </div>
        </div>
      </motion.div>

      {/* Course Components */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Course Components</h2>
        {learningPath.componentsLearning.map((component, componentIndex) => (
          <motion.div
            key={componentIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: componentIndex * 0.2 }}
            className="mb-6 bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-xl font-medium mb-3">{component.comptitle}</h3>
            <p className="text-gray-600 mb-4">{component.compdescription}</p>
            <div className="space-y-2">
              {component.combsub.map((subtitle, subtitleIndex) => (
                <div 
                  key={subtitleIndex} 
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
                >
                  <div>
                    <span className="font-medium">{subtitle.combsubttle}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({subtitle.combsubttlelevel})
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {subtitle.compsubttlehr} hours
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default LearningPathDetails;