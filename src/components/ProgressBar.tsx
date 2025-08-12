import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-slate-400">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-sm text-slate-400">
          {Math.round(progress)}% Complete
        </div>
      </div>
      
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < currentStep
                ? 'bg-blue-500'
                : i === currentStep - 1
                ? 'bg-blue-400'
                : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
