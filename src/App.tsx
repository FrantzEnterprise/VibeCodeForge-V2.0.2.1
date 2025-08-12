import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useFormData } from './hooks/useFormData';
import { ProgressBar } from './components/ProgressBar';
import { Step1AuthorInfo } from './steps/Step1AuthorInfo';
import { Step2Foundation } from './steps/Step2Foundation';
import { Step3TechSpecs } from './steps/Step3TechSpecs';
import { Step3Assets } from './steps/Step3Assets';
import { Step5DesignUX } from './steps/Step5DesignUX';
import { Step6ContentStrategy } from './steps/Step6ContentStrategy';
import { Step6Integrations } from './steps/Step6Integrations';
import { Step7FinalPrompt } from './steps/Step7FinalPrompt';

const TOTAL_STEPS = 8;

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const { data, updateData, resetData, exportData, importData } = useFormData();

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startOver = () => {
    resetData();
    setCurrentStep(1);
  };

  const renderStep = () => {
    const stepProps = {
      data,
      updateData,
      onNext: nextStep,
      onBack: prevStep,
      isValid: true
    };

    switch (currentStep) {
      case 1:
        return <Step1AuthorInfo {...stepProps} />;
      case 2:
        return <Step2Foundation {...stepProps} />;
      case 3:
        return <Step3TechSpecs {...stepProps} />;
      case 4:
        return <Step3Assets {...stepProps} />;
      case 5:
        return <Step5DesignUX {...stepProps} />;
      case 6:
        return <Step6ContentStrategy {...stepProps} />;
      case 7:
        return <Step6Integrations {...stepProps} />;
      case 8:
        return <Step7FinalPrompt data={data} onStartOver={startOver} />;
      default:
        return <Step1AuthorInfo {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 inter">
              VibeCodeForge
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light">
              Prompt Architect
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full" />
            
            {/* Auto-save indicator */}
            <div className="mt-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Auto-saving your progress
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container pb-16">
          {currentStep < TOTAL_STEPS && (
            <div className="progress-container">
              <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
