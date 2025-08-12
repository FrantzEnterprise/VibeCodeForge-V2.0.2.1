import React from 'react';
import { motion } from 'framer-motion';

interface SelectionCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  icon,
  selected,
  onClick,
  disabled = false
}) => {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`selection-card ${selected ? 'selected' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={!disabled ? onClick : undefined}
    >
      {icon && (
        <div className={`mb-4 ${selected ? 'text-blue-400' : 'text-slate-400'}`}>
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-slate-100 mb-2">
        {title}
      </h3>
      
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
      
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};
