import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Zap, Globe, Users, Code, Plus, X, Calendar, DollarSign, BarChart3 } from 'lucide-react';
import { SelectionCard } from '../components/SelectionCard';
import { StepNavigation } from '../components/StepNavigation';
import { FormData } from '../types/FormData';

interface Step2FoundationProps {
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
    icon: <Globe size={32} />,
    complexity: 'moderate',
    estimatedHours: '200-500'
  },
  {
    id: 'mobile-app',
    title: 'Mobile Application',
    description: 'Native or cross-platform mobile applications',
    icon: <Zap size={32} />,
    complexity: 'complex',
    estimatedHours: '300-800'
  },
  {
    id: 'api-service',
    title: 'API Service',
    description: 'Backend services, REST APIs, and microservices',
    icon: <Code size={32} />,
    complexity: 'moderate',
    estimatedHours: '150-400'
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Marketing pages, portfolios, and static websites',
    icon: <Target size={32} />,
    complexity: 'simple',
    estimatedHours: '40-120'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Admin panels, analytics dashboards, and data visualization',
    icon: <BarChart3 size={32} />,
    complexity: 'complex',
    estimatedHours: '250-600'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Store',
    description: 'Online stores with payment processing and inventory',
    icon: <Users size={32} />,
    complexity: 'complex',
    estimatedHours: '400-1000'
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Custom projects and unique requirements',
    icon: <Lightbulb size={32} />,
    complexity: 'moderate',
    estimatedHours: 'Variable'
  }
];

const TIMELINE_OPTIONS = [
  { id: '1-2weeks', label: '1-2 weeks', value: '1-2 weeks' },
  { id: '1month', label: '1 month', value: '1 month' },
  { id: '2-3months', label: '2-3 months', value: '2-3 months' },
  { id: '3-6months', label: '3-6 months', value: '3-6 months' },
  { id: '6months+', label: '6+ months', value: '6+ months' },
  { id: 'flexible', label: 'Flexible', value: 'flexible' }
];

const BUDGET_OPTIONS = [
  { id: 'under-5k', label: 'Under $5,000', value: 'under-5k' },
  { id: '5k-15k', label: '$5,000 - $15,000', value: '5k-15k' },
  { id: '15k-50k', label: '$15,000 - $50,000', value: '15k-50k' },
  { id: '50k-100k', label: '$50,000 - $100,000', value: '50k-100k' },
  { id: '100k+', label: '$100,000+', value: '100k+' },
  { id: 'not-specified', label: 'Not specified', value: 'not-specified' }
];

export const Step2Foundation: React.FC<Step2FoundationProps> = ({
  data,
  updateData,
  onNext,
  onBack,
  isValid
}) => {
  const [newGoal, setNewGoal] = useState('');

  const handleProjectTypeSelect = (type: string) => {
    const selectedType = PROJECT_TYPES.find(t => t.id === type);
    updateData({ 
      projectType: type,
      complexity: selectedType?.complexity as any || 'moderate'
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateData({ [field]: value });
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      updateData({
        projectGoals: [...(data.projectGoals || []), newGoal.trim()]
      });
      setNewGoal('');
    }
  };

  const removeGoal = (index: number) => {
    const updatedGoals = data.projectGoals.filter((_, i) => i !== index);
    updateData({ projectGoals: updatedGoals });
  };

  const selectedType = PROJECT_TYPES.find(t => t.id === data.projectType);

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
          Now let's define what you're building. Tell us about "{data.appName}" and 
          help us understand your project's core purpose and requirements.
        </p>
      </div>

      <div className="step-content space-y-8">
        {/* Project Type Selection */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">What type of project is "{data.appName}"?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECT_TYPES.map((type) => (
              <div key={type.id} className="relative">
                <SelectionCard
                  title={type.title}
                  description={type.description}
                  icon={type.icon}
                  selected={data.projectType === type.id}
                  onClick={() => handleProjectTypeSelect(type.id)}
                />
                <div className="absolute top-2 right-2 text-xs bg-slate-700 px-2 py-1 rounded">
                  {type.estimatedHours}h
                </div>
              </div>
            ))}
          </div>
          
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 glass-subtle rounded-lg"
            >
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1">
                  <BarChart3 size={16} />
                  Complexity: <span className="capitalize font-medium">{selectedType.complexity}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  Estimated: {selectedType.estimatedHours} hours
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label">Project Description *</label>
            <textarea
              className="form-input form-textarea"
              placeholder={`Describe ${data.appName}'s purpose, goals, and key features...`}
              value={data.projectDescription || ''}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Audience *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Who will use this project? (e.g., developers, business users, consumers)"
              value={data.targetAudience || ''}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            />
          </div>

          {/* Project Goals */}
          <div className="form-group">
            <label className="form-label">Project Goals</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="Add a project goal..."
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addGoal}
                  className="btn btn-primary px-4"
                  disabled={!newGoal.trim()}
                >
                  <Plus size={16} />
                </motion.button>
              </div>
              
              {data.projectGoals && data.projectGoals.length > 0 && (
                <div className="space-y-2">
                  {data.projectGoals.map((goal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 glass-subtle rounded-lg"
                    >
                      <span className="text-slate-200">{goal}</span>
                      <button
                        onClick={() => removeGoal(index)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Timeline and Budget */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label flex items-center gap-2">
                <Calendar size={16} />
                Project Timeline
              </label>
              <select
                className="form-input"
                value={data.timeline || ''}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              >
                <option value="">Select timeline</option>
                {TIMELINE_OPTIONS.map(option => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label flex items-center gap-2">
                <DollarSign size={16} />
                Budget Range
              </label>
              <select
                className="form-input"
                value={data.budget || ''}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              >
                <option value="">Select budget range</option>
                {BUDGET_OPTIONS.map(option => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Project Complexity Indicator */}
        {data.projectType && (
          <div className="glass-subtle p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-slate-100 mb-3">Project Analysis</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Complexity Level:</span>
                <div className={`mt-1 px-3 py-1 rounded-full text-xs font-medium inline-block ${
                  selectedType?.complexity === 'simple' ? 'bg-green-500/20 text-green-300' :
                  selectedType?.complexity === 'moderate' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {selectedType?.complexity}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Estimated Hours:</span>
                <p className="text-slate-200 font-medium">{selectedType?.estimatedHours}</p>
              </div>
              <div>
                <span className="text-slate-400">Recommended Team:</span>
                <p className="text-slate-200 font-medium">
                  {selectedType?.complexity === 'simple' ? '1-2 developers' :
                   selectedType?.complexity === 'moderate' ? '2-4 developers' :
                   '4-8 developers'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        isNextDisabled={!data.projectType || !data.projectDescription || !data.targetAudience}
      />
    </motion.div>
  );
};
