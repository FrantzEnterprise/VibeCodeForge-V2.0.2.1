import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Target, Globe, Plus, X, Search } from 'lucide-react';
import { SelectionCard } from '../components/SelectionCard';
import { StepNavigation } from '../components/StepNavigation';
import { FormData } from '../types/FormData';

interface Step6ContentStrategyProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

const TONE_OPTIONS = [
  { id: 'professional', name: 'Professional', description: 'Formal, authoritative, and business-focused' },
  { id: 'friendly', name: 'Friendly', description: 'Warm, approachable, and conversational' },
  { id: 'casual', name: 'Casual', description: 'Relaxed, informal, and easy-going' },
  { id: 'authoritative', name: 'Authoritative', description: 'Expert, confident, and trustworthy' },
  { id: 'playful', name: 'Playful', description: 'Fun, creative, and engaging' },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple, and to-the-point' }
];

const VOICE_OPTIONS = [
  { id: 'brand-focused', name: 'Brand-Focused', description: 'Emphasizes brand values and personality' },
  { id: 'user-centric', name: 'User-Centric', description: 'Focuses on user needs and benefits' },
  { id: 'solution-oriented', name: 'Solution-Oriented', description: 'Problem-solving and results-driven' },
  { id: 'educational', name: 'Educational', description: 'Informative and knowledge-sharing' },
  { id: 'inspirational', name: 'Inspirational', description: 'Motivating and empowering' },
  { id: 'technical', name: 'Technical', description: 'Detailed and specification-focused' }
];

const CONTENT_TYPES = [
  { id: 'landing-pages', name: 'Landing Pages', icon: <Target size={20} /> },
  { id: 'product-descriptions', name: 'Product Descriptions', icon: <MessageSquare size={20} /> },
  { id: 'blog-posts', name: 'Blog Posts', icon: <MessageSquare size={20} /> },
  { id: 'user-guides', name: 'User Guides', icon: <MessageSquare size={20} /> },
  { id: 'marketing-copy', name: 'Marketing Copy', icon: <Target size={20} /> },
  { id: 'technical-docs', name: 'Technical Documentation', icon: <MessageSquare size={20} /> },
  { id: 'social-media', name: 'Social Media Content', icon: <Globe size={20} /> },
  { id: 'email-templates', name: 'Email Templates', icon: <MessageSquare size={20} /> }
];

export const Step6ContentStrategy: React.FC<Step6ContentStrategyProps> = ({
  data,
  updateData,
  onNext,
  onBack,
  isValid
}) => {
  const [newKeyword, setNewKeyword] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleContentStrategyUpdate = (field: keyof FormData['contentStrategy'], value: any) => {
    updateData({
      contentStrategy: {
        ...data.contentStrategy,
        [field]: value
      }
    });
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      const currentKeywords = data.contentStrategy.seoKeywords || [];
      handleContentStrategyUpdate('seoKeywords', [...currentKeywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    const updatedKeywords = data.contentStrategy.seoKeywords.filter((_, i) => i !== index);
    handleContentStrategyUpdate('seoKeywords', updatedKeywords);
  };

  const addMessage = () => {
    if (newMessage.trim()) {
      const currentMessages = data.contentStrategy.messaging || [];
      handleContentStrategyUpdate('messaging', [...currentMessages, newMessage.trim()]);
      setNewMessage('');
    }
  };

  const removeMessage = (index: number) => {
    const updatedMessages = data.contentStrategy.messaging.filter((_, i) => i !== index);
    handleContentStrategyUpdate('messaging', updatedMessages);
  };

  const toggleContentType = (typeId: string) => {
    const currentTypes = data.contentStrategy.contentTypes || [];
    const updatedTypes = currentTypes.includes(typeId)
      ? currentTypes.filter(t => t !== typeId)
      : [...currentTypes, typeId];
    handleContentStrategyUpdate('contentTypes', updatedTypes);
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
        <h2 className="step-title">Content Strategy</h2>
        <p className="step-description">
          Define how "{data.appName}" will communicate with your audience. This includes 
          tone of voice, messaging, and content types.
        </p>
      </div>

      <div className="step-content space-y-8">
        {/* Tone of Voice */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Tone of Voice</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TONE_OPTIONS.map((tone) => (
              <motion.div
                key={tone.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.contentStrategy.tone === tone.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                onClick={() => handleContentStrategyUpdate('tone', tone.id)}
              >
                <h4 className="text-slate-200 font-medium mb-2">{tone.name}</h4>
                <p className="text-slate-400 text-sm">{tone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Voice Style */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Voice Style</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VOICE_OPTIONS.map((voice) => (
              <motion.div
                key={voice.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.contentStrategy.voice === voice.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                onClick={() => handleContentStrategyUpdate('voice', voice.id)}
              >
                <h4 className="text-slate-200 font-medium mb-2">{voice.name}</h4>
                <p className="text-slate-400 text-sm">{voice.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Messages */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Key Messages</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="Add a key message or value proposition..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMessage()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addMessage}
                className="btn btn-primary px-4"
                disabled={!newMessage.trim()}
              >
                <Plus size={16} />
              </motion.button>
            </div>
            
            {data.contentStrategy.messaging && data.contentStrategy.messaging.length > 0 && (
              <div className="space-y-2">
                {data.contentStrategy.messaging.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 glass-subtle rounded-lg"
                  >
                    <span className="text-slate-200">{message}</span>
                    <button
                      onClick={() => removeMessage(index)}
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

        {/* SEO Keywords */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
            <Search size={24} />
            SEO Keywords
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="Add SEO keywords..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addKeyword}
                className="btn btn-primary px-4"
                disabled={!newKeyword.trim()}
              >
                <Plus size={16} />
              </motion.button>
            </div>
            
            {data.contentStrategy.seoKeywords && data.contentStrategy.seoKeywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.contentStrategy.seoKeywords.map((keyword, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    <span>{keyword}</span>
                    <button
                      onClick={() => removeKeyword(index)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Types */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Content Types Needed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT_TYPES.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.contentStrategy.contentTypes?.includes(type.id)
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                onClick={() => toggleContentType(type.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-slate-400">
                    {type.icon}
                  </div>
                  <h4 className="text-slate-200 font-medium text-sm">{type.name}</h4>
                </div>
                {data.contentStrategy.contentTypes?.includes(type.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ml-auto"
                  >
                    <svg
                      className="w-3 h-3 text-white"
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
            ))}
          </div>
        </div>

        {/* Content Strategy Summary */}
        {(data.contentStrategy.tone || data.contentStrategy.voice) && (
          <div className="glass-subtle p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-slate-100 mb-4">Content Strategy Summary</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Tone:</span>
                <p className="text-slate-200 font-medium">
                  {TONE_OPTIONS.find(t => t.id === data.contentStrategy.tone)?.name || 'Not selected'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Voice:</span>
                <p className="text-slate-200 font-medium">
                  {VOICE_OPTIONS.find(v => v.id === data.contentStrategy.voice)?.name || 'Not selected'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Content Types:</span>
                <p className="text-slate-200 font-medium">
                  {data.contentStrategy.contentTypes?.length || 0} selected
                </p>
              </div>
              <div>
                <span className="text-slate-400">SEO Keywords:</span>
                <p className="text-slate-200 font-medium">
                  {data.contentStrategy.seoKeywords?.length || 0} keywords
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        isNextDisabled={!data.contentStrategy.tone || !data.contentStrategy.voice}
      />
    </motion.div>
  );
};
