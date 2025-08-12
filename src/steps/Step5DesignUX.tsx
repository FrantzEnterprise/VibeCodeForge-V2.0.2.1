import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Zap, Eye, Smartphone, Monitor } from 'lucide-react';
import { SelectionCard } from '../components/SelectionCard';
import { StepNavigation } from '../components/StepNavigation';
import { FormData } from '../types/FormData';

interface Step5DesignUXProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

const DESIGN_STYLES = [
  {
    id: 'modern',
    title: 'Modern & Clean',
    description: 'Minimalist design with clean lines and plenty of whitespace',
    icon: <Eye size={32} />
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    description: 'Frosted glass effect with transparency and blur',
    icon: <Palette size={32} />
  },
  {
    id: 'neumorphism',
    title: 'Neumorphism',
    description: 'Soft, extruded plastic look with subtle shadows',
    icon: <Zap size={32} />
  },
  {
    id: 'dark',
    title: 'Dark Theme',
    description: 'Dark backgrounds with bright accents',
    icon: <Monitor size={32} />
  },
  {
    id: 'colorful',
    title: 'Colorful & Vibrant',
    description: 'Bold colors and gradients with high energy',
    icon: <Palette size={32} />
  },
  {
    id: 'professional',
    title: 'Professional',
    description: 'Corporate and business-focused design',
    icon: <Type size={32} />
  }
];

const COLOR_SCHEMES = [
  { id: 'blue-purple', name: 'Blue & Purple', primary: '#3b82f6', secondary: '#8b5cf6' },
  { id: 'green-teal', name: 'Green & Teal', primary: '#10b981', secondary: '#06b6d4' },
  { id: 'orange-red', name: 'Orange & Red', primary: '#f97316', secondary: '#ef4444' },
  { id: 'pink-purple', name: 'Pink & Purple', primary: '#ec4899', secondary: '#a855f7' },
  { id: 'indigo-blue', name: 'Indigo & Blue', primary: '#6366f1', secondary: '#3b82f6' },
  { id: 'custom', name: 'Custom Colors', primary: '#3b82f6', secondary: '#8b5cf6' }
];

const TYPOGRAPHY_OPTIONS = [
  { id: 'inter', name: 'Inter', description: 'Modern, clean sans-serif' },
  { id: 'roboto', name: 'Roboto', description: 'Google\'s friendly sans-serif' },
  { id: 'poppins', name: 'Poppins', description: 'Geometric sans-serif' },
  { id: 'montserrat', name: 'Montserrat', description: 'Urban inspired font' },
  { id: 'playfair', name: 'Playfair Display', description: 'Elegant serif font' },
  { id: 'custom', name: 'Custom Font', description: 'Specify your own font' }
];

const ANIMATION_STYLES = [
  { id: 'subtle', name: 'Subtle', description: 'Minimal animations and transitions' },
  { id: 'smooth', name: 'Smooth', description: 'Fluid transitions and micro-interactions' },
  { id: 'dynamic', name: 'Dynamic', description: 'Engaging animations and effects' },
  { id: 'none', name: 'No Animations', description: 'Static design without animations' }
];

export const Step5DesignUX: React.FC<Step5DesignUXProps> = ({
  data,
  updateData,
  onNext,
  onBack,
  isValid
}) => {
  const handleDesignStyleSelect = (style: string) => {
    updateData({ designStyle: style });
  };

  const handleColorSchemeSelect = (scheme: string) => {
    const selectedScheme = COLOR_SCHEMES.find(s => s.id === scheme);
    if (selectedScheme) {
      updateData({
        colorScheme: scheme,
        primaryColor: selectedScheme.primary,
        secondaryColor: selectedScheme.secondary
      });
    }
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
        <h2 className="step-title">Design & User Experience</h2>
        <p className="step-description">
          Let's define the visual style and user experience for "{data.appName}". 
          Choose designs that reflect your brand and appeal to your target audience.
        </p>
      </div>

      <div className="step-content space-y-8">
        {/* Design Style */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Design Style</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DESIGN_STYLES.map((style) => (
              <SelectionCard
                key={style.id}
                title={style.title}
                description={style.description}
                icon={style.icon}
                selected={data.designStyle === style.id}
                onClick={() => handleDesignStyleSelect(style.id)}
              />
            ))}
          </div>
        </div>

        {/* Custom Style Input */}
        {data.designStyle && (
          <div className="form-group">
            <label className="form-label">Additional Style Notes</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Describe any specific design preferences, inspirations, or requirements..."
              value={data.customStyle || ''}
              onChange={(e) => handleInputChange('customStyle', e.target.value)}
              rows={3}
            />
          </div>
        )}

        {/* Color Scheme */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Color Scheme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOR_SCHEMES.map((scheme) => (
              <motion.div
                key={scheme.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.colorScheme === scheme.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                onClick={() => handleColorSchemeSelect(scheme.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: scheme.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: scheme.secondary }}
                    />
                  </div>
                  <span className="text-slate-200 font-medium">{scheme.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        {data.colorScheme === 'custom' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid md:grid-cols-3 gap-4"
          >
            <div className="form-group">
              <label className="form-label">Primary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  className="w-12 h-10 rounded border border-slate-600"
                  value={data.primaryColor || '#3b82f6'}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                />
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="#3b82f6"
                  value={data.primaryColor || ''}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Secondary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  className="w-12 h-10 rounded border border-slate-600"
                  value={data.secondaryColor || '#8b5cf6'}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                />
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="#8b5cf6"
                  value={data.secondaryColor || ''}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Accent Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  className="w-12 h-10 rounded border border-slate-600"
                  value={data.accentColor || '#06b6d4'}
                  onChange={(e) => handleInputChange('accentColor', e.target.value)}
                />
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="#06b6d4"
                  value={data.accentColor || ''}
                  onChange={(e) => handleInputChange('accentColor', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Typography */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Typography</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TYPOGRAPHY_OPTIONS.map((font) => (
              <motion.div
                key={font.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.typography === font.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                onClick={() => handleInputChange('typography', font.id)}
              >
                <h4 className="text-slate-200 font-medium mb-1">{font.name}</h4>
                <p className="text-slate-400 text-sm">{font.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animation Style */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Animation Style</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ANIMATION_STYLES.map((animation) => (
              <motion.div
                key={animation.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.animationStyle === animation.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                onClick={() => handleInputChange('animationStyle', animation.id)}
              >
                <h4 className="text-slate-200 font-medium mb-1">{animation.name}</h4>
                <p className="text-slate-400 text-sm">{animation.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Design Preview */}
        {data.designStyle && data.colorScheme && (
          <div className="glass-subtle p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-slate-100 mb-4">Design Summary</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Style:</span>
                <p className="text-slate-200 font-medium capitalize">
                  {DESIGN_STYLES.find(s => s.id === data.designStyle)?.title}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Colors:</span>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: data.primaryColor }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: data.secondaryColor }}
                  />
                  <span className="text-slate-200 font-medium">
                    {COLOR_SCHEMES.find(s => s.id === data.colorScheme)?.name}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-slate-400">Typography:</span>
                <p className="text-slate-200 font-medium">
                  {TYPOGRAPHY_OPTIONS.find(t => t.id === data.typography)?.name || 'Not selected'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Animations:</span>
                <p className="text-slate-200 font-medium">
                  {ANIMATION_STYLES.find(a => a.id === data.animationStyle)?.name || 'Not selected'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        isNextDisabled={!data.designStyle || !data.colorScheme}
      />
    </motion.div>
  );
};
