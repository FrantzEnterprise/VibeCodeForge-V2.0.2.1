import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, RefreshCw, Sparkles, CheckCircle } from 'lucide-react';
import { FormData } from '../types/FormData';
import { generatePrompt } from '../utils/promptGenerator';

interface Step7FinalPromptProps {
  data: FormData;
  onStartOver: () => void;
}

export const Step7FinalPrompt: React.FC<Step7FinalPromptProps> = ({
  data,
  onStartOver
}) => {
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateFinalPrompt();
  }, [data]);

  const generateFinalPrompt = async () => {
    setIsGenerating(true);
    // Simulate generation time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    const generatedPrompt = generatePrompt(data);
    setPrompt(generatedPrompt);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.appName || 'project'}-prompt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const regeneratePrompt = () => {
    generateFinalPrompt();
  };

  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="step-container glass-card text-center"
      >
        <div className="step-header">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles size={48} className="text-blue-400" />
          </motion.div>
          <h2 className="step-title">Generating Your AI Prompt</h2>
          <p className="step-description">
            We're crafting a comprehensive AI prompt based on all your specifications...
          </p>
        </div>
        
        <div className="mt-8">
          <div className="progress-bar max-w-md mx-auto">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          <p className="text-slate-400 mt-4">This may take a moment...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="step-container glass-card"
    >
      <div className="step-header">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-block mb-6"
        >
          <CheckCircle size={48} className="text-green-400" />
        </motion.div>
        <h2 className="step-title">Your AI Prompt is Ready! 🎉</h2>
        <p className="step-description">
          Here's your comprehensive AI prompt for "{data.appName}". Copy it and use it with 
          your favorite AI assistant to start building your project.
        </p>
      </div>

      <div className="step-content space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="btn btn-primary"
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPrompt}
            className="btn btn-secondary"
          >
            <Download size={16} />
            Download
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={regeneratePrompt}
            className="btn btn-secondary"
          >
            <RefreshCw size={16} />
            Regenerate
          </motion.button>
        </div>

        {/* Prompt Display */}
        <div className="relative">
          <div className="code-block max-h-96 overflow-y-auto">
            {prompt}
          </div>
          
          {/* Copy button overlay */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyToClipboard}
            className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
          </motion.button>
        </div>

        {/* Project Summary */}
        <div className="glass-subtle p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-slate-100 mb-4">Project Summary</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Project Type:</span>
              <p className="text-slate-200 font-medium capitalize">
                {data.projectType?.replace('-', ' ') || 'Not specified'}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Tech Stack:</span>
              <p className="text-slate-200 font-medium">
                {data.techStack?.replace('-', ' ') || 'Not specified'}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Design Style:</span>
              <p className="text-slate-200 font-medium capitalize">
                {data.designStyle || 'Not specified'}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Integrations:</span>
              <p className="text-slate-200 font-medium">
                {Object.values(data.integrations).filter(i => i.enabled).length} enabled
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="glass-subtle p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-slate-100 mb-4">🚀 Next Steps</h4>
          <div className="space-y-3 text-slate-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <p>Copy the generated prompt above</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <p>Open your preferred AI assistant (ChatGPT, Claude, etc.)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <p>Paste the prompt and start building your project</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">4.</span>
              <p>Iterate and refine based on the AI's responses</p>
            </div>
          </div>
        </div>

        {/* Start Over Button */}
        <div className="text-center pt-6 border-t border-slate-700/50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartOver}
            className="btn btn-secondary"
          >
            <RefreshCw size={16} />
            Start New Project
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
