import { useState, useEffect } from 'react';
import { FormData } from '../types/FormData';

const STORAGE_KEY = 'vibecodefore-prompt-architect-data';

const initialData: FormData = {
  // Step 1: Author Information
  name: '',
  email: '',
  phone: '',
  appName: '',
  
  // Step 2: Project Foundation
  projectType: '',
  projectName: '',
  projectDescription: '',
  targetAudience: '',
  projectGoals: [],
  timeline: '',
  budget: '',
  complexity: 'moderate',
  
  // Step 3: Technical Specifications
  techStack: '',
  deployment: '',
  requirements: '',
  performance: '',
  functionalRequirements: [],
  nonFunctionalRequirements: [],
  constraints: [],
  assumptions: [],
  
  // Step 4: Assets
  referenceFiles: [],
  logoFiles: [],
  backgroundFile: null,
  
  // Step 5: Design & UX
  designStyle: '',
  customStyle: '',
  colorScheme: '',
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  accentColor: '#06b6d4',
  typography: '',
  animationStyle: '',
  userExperience: {
    userJourney: [],
    accessibility: [],
    responsiveBreakpoints: [],
    browserSupport: []
  },
  
  // Step 6: Content Strategy
  contentStrategy: {
    tone: '',
    voice: '',
    messaging: [],
    seoKeywords: [],
    contentTypes: [],
    localization: []
  },
  
  // Step 7: Security & Compliance
  security: {
    authenticationMethod: '',
    dataProtection: [],
    compliance: [],
    securityFeatures: []
  },
  
  // Step 8: Performance & Scalability
  performance: {
    expectedUsers: '',
    loadTime: '',
    scalingStrategy: '',
    caching: [],
    optimization: []
  },
  
  // Step 9: Testing & Quality Assurance
  testing: {
    testingTypes: [],
    testingTools: [],
    qualityMetrics: [],
    cicdPipeline: false
  },
  
  // Step 10: Integrations
  integrations: {
    email: {
      enabled: false,
      provider: '',
      apiKey: '',
      fromEmail: '',
      fromName: '',
      templates: []
    },
    autoresponder: {
      enabled: false,
      provider: '',
      apiKey: '',
      listId: '',
      sequences: []
    },
    payment: {
      enabled: false,
      providers: {
        stripe: { enabled: false, publishableKey: '', secretKey: '' },
        paypal: { enabled: false, clientId: '', clientSecret: '' },
        square: { enabled: false, applicationId: '', accessToken: '' }
      },
      currency: 'USD',
      subscriptionPlans: []
    },
    development: {
      enabled: false,
      github: {
        enabled: false,
        username: '',
        token: '',
        repository: ''
      },
      vercel: {
        enabled: false,
        token: '',
        teamId: ''
      },
      tailwind: {
        enabled: true,
        config: 'default',
        customConfig: ''
      }
    },
    cloud: {
      enabled: false,
      providers: {
        aws: { enabled: false, accessKey: '', secretKey: '', region: '' },
        gcp: { enabled: false, projectId: '', keyFile: '' },
        azure: { enabled: false, subscriptionId: '', clientId: '', clientSecret: '' },
        firebase: { enabled: false, projectId: '', apiKey: '' },
        supabase: { enabled: false, url: '', anonKey: '' }
      }
    },
    analytics: {
      enabled: false,
      providers: {
        googleAnalytics: { enabled: false, trackingId: '' },
        mixpanel: { enabled: false, token: '' },
        amplitude: { enabled: false, apiKey: '' },
        hotjar: { enabled: false, siteId: '' },
        posthog: { enabled: false, apiKey: '' }
      }
    },
    social: {
      enabled: false,
      providers: {
        twitter: { enabled: false, apiKey: '', apiSecret: '' },
        facebook: { enabled: false, appId: '', appSecret: '' },
        linkedin: { enabled: false, clientId: '', clientSecret: '' },
        discord: { enabled: false, botToken: '', guildId: '' },
        slack: { enabled: false, botToken: '', signingSecret: '' }
      }
    },
    thirdParty: []
  },
  
  // Step 11: Maintenance & Support
  maintenance: {
    updateFrequency: '',
    supportLevel: '',
    documentation: [],
    monitoring: [],
    backupStrategy: ''
  },
  
  // Prompt Optimization
  promptTemplate: '',
  promptScore: 0,
  promptVersion: 1,
  customInstructions: ''
};

export const useFormData = () => {
  const [data, setData] = useState<FormData>(initialData);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData({ ...initialData, ...parsedData });
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [data]);

  const updateData = (updates: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.appName || 'project'}-data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setData({ ...initialData, ...importedData });
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  return {
    data,
    updateData,
    resetData,
    exportData,
    importData
  };
};
