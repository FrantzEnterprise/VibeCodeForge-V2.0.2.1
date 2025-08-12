import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, FileText, X } from 'lucide-react';
import { StepNavigation } from '../components/StepNavigation';
import { FormData } from '../types/FormData';

interface Step3AssetsProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export const Step3Assets: React.FC<Step3AssetsProps> = ({
  data,
  updateData,
  onNext,
  onBack,
  isValid
}) => {
  const handleFileUpload = useCallback((files: FileList | null, type: 'reference' | 'logo' | 'background') => {
    if (!files) return;

    const fileArray = Array.from(files);
    
    switch (type) {
      case 'reference':
        updateData({ referenceFiles: [...data.referenceFiles, ...fileArray] });
        break;
      case 'logo':
        updateData({ logoFiles: [...data.logoFiles, ...fileArray] });
        break;
      case 'background':
        updateData({ backgroundFile: fileArray[0] });
        break;
    }
  }, [data, updateData]);

  const removeFile = (index: number, type: 'reference' | 'logo') => {
    switch (type) {
      case 'reference':
        const updatedReferenceFiles = data.referenceFiles.filter((_, i) => i !== index);
        updateData({ referenceFiles: updatedReferenceFiles });
        break;
      case 'logo':
        const updatedLogoFiles = data.logoFiles.filter((_, i) => i !== index);
        updateData({ logoFiles: updatedLogoFiles });
        break;
    }
  };

  const removeBackgroundFile = () => {
    updateData({ backgroundFile: null });
  };

  const FileUploadArea: React.FC<{
    title: string;
    description: string;
    accept: string;
    multiple?: boolean;
    onFileUpload: (files: FileList | null) => void;
    icon: React.ReactNode;
  }> = ({ title, description, accept, multiple = false, onFileUpload, icon }) => (
    <div className="file-upload-area">
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onFileUpload(e.target.files)}
        className="hidden"
        id={`file-${title.toLowerCase().replace(' ', '-')}`}
      />
      <label htmlFor={`file-${title.toLowerCase().replace(' ', '-')}`} className="cursor-pointer">
        <div className="text-slate-400 mb-4">
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-slate-200 mb-2">{title}</h4>
        <p className="text-slate-400 text-sm">{description}</p>
        <div className="mt-4">
          <span className="btn btn-secondary">
            <Upload size={16} />
            Choose Files
          </span>
        </div>
      </label>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="step-container glass-card"
    >
      <div className="step-header">
        <h2 className="step-title">Project Assets</h2>
        <p className="step-description">
          Upload any reference materials, logos, or design assets that will help us understand 
          your vision for "{data.appName}".
        </p>
      </div>

      <div className="step-content space-y-8">
        {/* Reference Files */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Reference Materials</h3>
          <FileUploadArea
            title="Reference Files"
            description="Upload wireframes, mockups, inspiration images, or any reference materials"
            accept="image/*,.pdf,.doc,.docx,.txt"
            multiple={true}
            onFileUpload={(files) => handleFileUpload(files, 'reference')}
            icon={<FileText size={48} />}
          />
          
          {data.referenceFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-slate-200 mb-3">Uploaded Reference Files</h4>
              <div className="space-y-2">
                {data.referenceFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 glass-subtle rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-slate-400" />
                      <div>
                        <span className="text-slate-200">{file.name}</span>
                        <p className="text-xs text-slate-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index, 'reference')}
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

        {/* Logo Files */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Brand Assets</h3>
          <FileUploadArea
            title="Logo Files"
            description="Upload your logo in various formats (PNG, SVG, JPG)"
            accept="image/*"
            multiple={true}
            onFileUpload={(files) => handleFileUpload(files, 'logo')}
            icon={<Image size={48} />}
          />
          
          {data.logoFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-slate-200 mb-3">Uploaded Logo Files</h4>
              <div className="space-y-2">
                {data.logoFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 glass-subtle rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Image size={20} className="text-slate-400" />
                      <div>
                        <span className="text-slate-200">{file.name}</span>
                        <p className="text-xs text-slate-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index, 'logo')}
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

        {/* Background Image */}
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-6">Background Image</h3>
          <FileUploadArea
            title="Background Image"
            description="Upload a background image for your application (optional)"
            accept="image/*"
            multiple={false}
            onFileUpload={(files) => handleFileUpload(files, 'background')}
            icon={<Image size={48} />}
          />
          
          {data.backgroundFile && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-slate-200 mb-3">Background Image</h4>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 glass-subtle rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Image size={20} className="text-slate-400" />
                  <div>
                    <span className="text-slate-200">{data.backgroundFile.name}</span>
                    <p className="text-xs text-slate-400">
                      {(data.backgroundFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeBackgroundFile}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            </div>
          )}
        </div>

        {/* Note */}
        <div className="glass-subtle p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-slate-100 mb-3">📝 Note</h4>
          <p className="text-slate-300 leading-relaxed">
            All uploaded files are stored locally in your browser and are not sent to any server. 
            They will be used to generate context for your AI prompt. You can skip this step if 
            you don't have any assets to upload.
          </p>
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        isNextDisabled={false}
      />
    </motion.div>
  );
};
