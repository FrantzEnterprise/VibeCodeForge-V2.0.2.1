import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Sparkles } from 'lucide-react';
import { StepNavigation } from '../components/StepNavigation';
import { FormData } from '../types/FormData';

interface Step1AuthorInfoProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export const Step1AuthorInfo: React.FC<Step1AuthorInfoProps> = ({
  data,
  updateData,
  onNext,
  isValid
}) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    updateData({ [field]: value });
  };

  const isFormValid = data.name && data.email && data.appName;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="step-container glass-card"
    >
      <div className="step-header">
        <h2 className="step-title">Let's Get Started</h2>
        <p className="step-description">
          First, tell us about yourself and your project. This information helps us 
          create a personalized development experience tailored to your needs.
        </p>
      </div>

      <div className="step-content space-y-8">
        {/* Author Information */}
        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <User size={16} />
              Your Name *
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your full name..."
              value={data.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Mail size={16} />
              Email Address *
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="your.email@example.com"
              value={data.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Phone size={16} />
              Phone Number <span className="text-slate-500 text-sm">(optional)</span>
            </label>
            <input
              type="tel"
              className="form-input"
              placeholder="+1 (555) 123-4567"
              value={data.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <Sparkles size={16} />
              Application Name *
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="What would you like to call your application?"
              value={data.appName || ''}
              onChange={(e) => handleInputChange('appName', e.target.value)}
              required
            />
            <p className="text-sm text-slate-500 mt-2">
              This will be the name of your project throughout the development process.
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="glass-subtle p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-3">
            Welcome to VibeForge! 🚀
          </h3>
          <p className="text-slate-300 leading-relaxed">
            We're excited to help you bring your vision to life. Our step-by-step process 
            will guide you through defining your project requirements, choosing the right 
            technology stack, and creating a comprehensive development plan.
          </p>
        </div>
      </div>

      <StepNavigation
        onNext={onNext}
        showBack={false}
        isNextDisabled={!isFormValid}
        nextLabel="Continue to Project Details"
      />
    </motion.div>
  );
};
