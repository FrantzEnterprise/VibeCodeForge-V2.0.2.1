import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Zap, Globe, Users, Code } from 'lucide-react';
import { SelectionCard } from '../components/SelectionCard';
import { StepNavigation } from '../components/StepNavigation';
import { FormData } from '../types/FormData';

interface Step1FoundationProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

const PROJECT_TYPES = [
  {
    id: 'web-app',
    title: 'Web Application',
    description: 'Interactive web-based applications with modern UI/UX',
    icon: <Globe size={32} />
  },
  {
    id: 'mobile-app',
    title: 'Mobile Application',
    description: 'Native or cross-platform mobile applications',
    icon: <Zap size={32} />
  },
  {
    id: 'api-service',
    title: 'API Service',
    description: 'Backend services, REST APIs, and microservices',
    icon: <Code size={32} />
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Marketing pages, portfolios, and static websites',
    icon: <Target size={32} />
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Admin panels, analytics dashboards, and data visualization',
    icon: <Users size={32} />
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Custom projects and unique requirements',
    icon: <Lightbulb size={32} />
  }
];

export const Step1Foundation: React.FC<Step1FoundationProps> = ({
  data,
  updateData,
  onNext,
  isValid
}) => {
  const handleProjectTypeSelect = (type: string) => {
    updateData({ projectType: type });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateData({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="step-container glass-card"
    >
      <div className="step-header">
        <h2 className="step-title">Project Foundation</h2>
        <p className="step-description">
          Let's start by understanding your project's core purpose and requirements. 
          This foundation will guide the entire development process.
        </p>
      </div>

      <div className="step-content space-y-8">
        {/* Project Type Selection */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">What type of project are you building?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECT_TYPES.map((type) => (
              <SelectionCard
                key={type.id}
                title={type.title}
                description={type.description}
                icon={type.icon}
                selected={data.projectType === type.id}
                onClick={() => handleProjectTypeSelect(type.id)}
              />
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your project name..."
              value={data.projectName || ''}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Project Description</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Describe your project's purpose, goals, and key features..."
              value={data.projectDescription || ''}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Audience</label>
            <input
              type="text"
              className="form-input"
              placeholder="Who will use this project? (e.g., developers, business users, consumers)"
              value={data.targetAudience || ''}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            />
          </div>
        </div>
      </div>

      <StepNavigation
        onNext={onNext}
        showBack={false}
        isNextDisabled={!data.projectType}
      />
    </motion.div>
  );
};
