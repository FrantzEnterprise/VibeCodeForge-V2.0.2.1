import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  isNextDisabled = false,
  isBackDisabled = false,
  nextLabel = 'Next Step',
  backLabel = 'Back'
}) => {
  return (
    <div className="flex justify-between items-center pt-8 border-t border-slate-700/50">
      <div>
        {showBack && onBack && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            disabled={isBackDisabled}
            className="btn btn-secondary"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </motion.button>
        )}
      </div>
      
      <div>
        {showNext && onNext && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={isNextDisabled}
            className="btn btn-primary btn-lg"
          >
            {nextLabel}
            <ArrowRight size={16} />
          </motion.button>
        )}
      </div>
    </div>
  );
};
