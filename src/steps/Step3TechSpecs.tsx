import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Zap, Plus, X, Settings } from 'lucide-react';
import { SelectionCard } from '../components/SelectionCard';
import { StepNavigation } from '../components/StepNavigation';
import { FormData } from '../types/FormData';

interface Step3TechSpecsProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

const TECH_STACKS = [
  {
    id: 'react-node',
    title: 'React + Node.js',
    description: 'Modern full-stack JavaScript with React frontend and Node.js backend',
    icon: <Code size={32} />,
    tags: ['Frontend', 'Backend', 'JavaScript']
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    description: 'Full-stack React framework with SSR, API routes, and deployment optimization',
    icon: <Zap size={32} />,
    tags: ['Full-stack', 'React', 'SSR']
  },
  {
    id: 'vue-nuxt',
    title: 'Vue.js + Nuxt',
    description: 'Progressive Vue.js framework with server-side rendering',
    icon: <Code size={32} />,
    tags: ['Frontend', 'Vue', 'SSR']
  },
  {
    id: 'python-django',
    title: 'Python + Django',
    description: 'Robust backend framework with admin interface and ORM',
    icon: <Database size={32} />,
    tags: ['Backend', 'Python', 'Web Framework']
  },
  {
    id: 'python-fastapi',
    title: 'Python + FastAPI',
    description: 'Modern, fast API framework with automatic documentation',
    icon: <Zap size={32} />,
    tags: ['API', 'Python', 'Performance']
  },
  {
    id: 'php-laravel',
    title: 'PHP + Laravel',
    description: 'Elegant PHP framework with built-in features and ecosystem',
    icon: <Code size={32} />,
    tags: ['Backend', 'PHP', 'MVC']
  },
  {
    id: 'ruby-rails',
    title: 'Ruby on Rails',
    description: 'Convention over configuration web framework',
    icon: <Database size={32} />,
    tags: ['Full-stack', 'Ruby', 'MVC']
  },
  {
    id: 'custom',
    title: 'Custom Stack',
    description: 'Specify your own technology preferences',
    icon: <Settings size={32} />,
    tags: ['Custom', 'Flexible']
  }
];

const DEPLOYMENT_OPTIONS = [
  {
    id: 'vercel',
    title: 'Vercel',
    description: 'Optimized for frontend frameworks with global CDN',
    icon: <Cloud size={24} />
  },
  {
    id: 'netlify',
    title: 'Netlify',
    description: 'JAMstack platform with continuous deployment',
    icon: <Cloud size={24} />
  },
  {
    id: 'aws',
    title: 'AWS',
    description: 'Comprehensive cloud platform with scalable services',
    icon: <Cloud size={24} />
  },
  {
    id: 'gcp',
    title: 'Google Cloud',
    description: 'Google\'s cloud platform with AI/ML capabilities',
    icon: <Cloud size={24} />
  },
  {
    id: 'azure',
    title: 'Microsoft Azure',
    description: 'Enterprise-grade cloud platform',
    icon: <Cloud size={24} />
  },
  {
    id: 'heroku',
    title: 'Heroku',
    description: 'Simple platform-as-a-service for quick deployment',
    icon: <Cloud size={24} />
  }
];

export const Step3TechSpecs: React.FC<Step3TechSpecsProps> = ({
  data,
  updateData,
  onNext,
  onBack,
  isValid
}) => {
  const [newRequirement, setNewRequirement] = useState('');
  const [requirementType, setRequirementType] = useState<'functional' | 'nonFunctional'>('functional');

  const handleTechStackSelect = (stack: string) => {
    updateData({ techStack: stack });
  };

  const handleDeploymentSelect = (deployment: string) => {
    updateData({ deployment: deployment });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateData({ [field]: value });
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      const field = requirementType === 'functional' ? 'functionalRequirements' : 'nonFunctionalRequirements';
      const currentRequirements = data[field] || [];
      updateData({
        [field]: [...currentRequirements, newRequirement.trim()]
      });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number, type: 'functional' | 'nonFunctional') => {
    const field = type === 'functional' ? 'functionalRequirements' : 'nonFunctionalRequirements';
    const currentRequirements = data[field] || [];
    const updatedRequirements = currentRequirements.filter((_, i) => i !== index);
    updateData({ [field]: updatedRequirements });
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
        <h2 className="step-title">Technical Specifications</h2>
        <p className="step-description">
          Let's define the technical foundation for "{data.appName}". Choose your preferred 
          technology stack and deployment platform.
        </p>
      </div>

      <div className="step-content space-y-8">
        {/* Technology Stack */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Technology Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_STACKS.map((stack) => (
              <div key={stack.id} className="relative">
                <SelectionCard
                  title={stack.title}
                  description={stack.description}
                  icon={stack.icon}
                  selected={data.techStack === stack.id}
                  onClick={() => handleTechStackSelect(stack.id)}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {stack.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Tech Stack Input */}
        {data.techStack === 'custom' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="form-group"
          >
            <label className="form-label">Custom Technology Stack</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Describe your preferred technologies, frameworks, and tools..."
              value={data.requirements || ''}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              rows={3}
            />
          </motion.div>
        )}

        {/* Deployment Platform */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Deployment Platform</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPLOYMENT_OPTIONS.map((option) => (
              <SelectionCard
                key={option.id}
                title={option.title}
                description={option.description}
                icon={option.icon}
                selected={data.deployment === option.id}
                onClick={() => handleDeploymentSelect(option.id)}
              />
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-4">Project Requirements</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  className="form-input w-48"
                  value={requirementType}
                  onChange={(e) => setRequirementType(e.target.value as 'functional' | 'nonFunctional')}
                >
                  <option value="functional">Functional</option>
                  <option value="nonFunctional">Non-Functional</option>
                </select>
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder={`Add a ${requirementType} requirement...`}
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addRequirement}
                  className="btn btn-primary px-4"
                  disabled={!newRequirement.trim()}
                >
                  <Plus size={16} />
                </motion.button>
              </div>

              {/* Functional Requirements */}
              {data.functionalRequirements && data.functionalRequirements.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-slate-200 mb-3">Functional Requirements</h4>
                  <div className="space-y-2">
                    {data.functionalRequirements.map((req, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 glass-subtle rounded-lg"
                      >
                        <span className="text-slate-200">{req}</span>
                        <button
                          onClick={() => removeRequirement(index, 'functional')}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Non-Functional Requirements */}
              {data.nonFunctionalRequirements && data.nonFunctionalRequirements.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-slate-200 mb-3">Non-Functional Requirements</h4>
                  <div className="space-y-2">
                    {data.nonFunctionalRequirements.map((req, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 glass-subtle rounded-lg"
                      >
                        <span className="text-slate-200">{req}</span>
                        <button
                          onClick={() => removeRequirement(index, 'nonFunctional')}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Requirements */}
          <div className="form-group">
            <label className="form-label">Performance Requirements</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Describe performance expectations (load time, concurrent users, etc.)..."
              value={data.performance || ''}
              onChange={(e) => handleInputChange('performance', e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        isNextDisabled={!data.techStack}
      />
    </motion.div>
  );
};
