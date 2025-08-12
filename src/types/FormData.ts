export interface FormData {
  // Step 1: Author Information
  name: string;
  email: string;
  phone: string;
  appName: string;
  
  // Step 2: Project Foundation
  projectType: string;
  projectName: string;
  projectDescription: string;
  targetAudience: string;
  projectGoals: string[];
  timeline: string;
  budget: string;
  complexity: 'simple' | 'moderate' | 'complex' | 'enterprise';
  
  // Step 3: Technical Specifications
  techStack: string;
  deployment: string;
  requirements: string;
  performance: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  constraints: string[];
  assumptions: string[];
  
  // Step 4: Assets
  referenceFiles: File[];
  logoFiles: File[];
  backgroundFile: File | null;
  
  // Step 5: Design & UX
  designStyle: string;
  customStyle: string;
  colorScheme: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  typography: string;
  animationStyle: string;
  userExperience: {
    userJourney: string[];
    accessibility: string[];
    responsiveBreakpoints: string[];
    browserSupport: string[];
  };
  
  // Step 6: Content Strategy
  contentStrategy: {
    tone: string;
    voice: string;
    messaging: string[];
    seoKeywords: string[];
    contentTypes: string[];
    localization: string[];
  };
  
  // Step 7: Security & Compliance
  security: {
    authenticationMethod: string;
    dataProtection: string[];
    compliance: string[];
    securityFeatures: string[];
  };
  
  // Step 8: Performance & Scalability
  performance: {
    expectedUsers: string;
    loadTime: string;
    scalingStrategy: string;
    caching: string[];
    optimization: string[];
  };
  
  // Step 9: Testing & Quality Assurance
  testing: {
    testingTypes: string[];
    testingTools: string[];
    qualityMetrics: string[];
    cicdPipeline: boolean;
  };
  
  // Step 10: Integrations
  integrations: {
    email: EmailIntegration;
    autoresponder: AutoresponderIntegration;
    payment: PaymentIntegration;
    development: DevelopmentIntegration;
    cloud: CloudIntegration;
    analytics: AnalyticsIntegration;
    social: SocialIntegration;
    thirdParty: ThirdPartyIntegration[];
  };
  
  // Step 11: Maintenance & Support
  maintenance: {
    updateFrequency: string;
    supportLevel: string;
    documentation: string[];
    monitoring: string[];
    backupStrategy: string;
  };
  
  // Prompt Optimization
  promptTemplate: string;
  promptScore: number;
  promptVersion: number;
  customInstructions: string;
}

export interface EmailIntegration {
  enabled: boolean;
  provider: 'gmail' | 'outlook' | 'sendgrid' | 'mailgun' | 'ses' | '';
  apiKey: string;
  fromEmail: string;
  fromName: string;
  templates: EmailTemplate[];
}

export interface EmailTemplate {
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'notification' | 'marketing' | 'transactional';
}

export interface AutoresponderIntegration {
  enabled: boolean;
  provider: 'mailchimp' | 'convertkit' | 'activecampaign' | 'aweber' | 'getresponse' | '';
  apiKey: string;
  listId: string;
  sequences: AutoresponderSequence[];
}

export interface AutoresponderSequence {
  name: string;
  trigger: string;
  emails: EmailTemplate[];
}

export interface PaymentIntegration {
  enabled: boolean;
  providers: {
    stripe: { enabled: boolean; publishableKey: string; secretKey: string; };
    paypal: { enabled: boolean; clientId: string; clientSecret: string; };
    square: { enabled: boolean; applicationId: string; accessToken: string; };
  };
  currency: string;
  subscriptionPlans: SubscriptionPlan[];
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
}

export interface DevelopmentIntegration {
  enabled: boolean;
  github: {
    enabled: boolean;
    username: string;
    token: string;
    repository: string;
  };
  vercel: {
    enabled: boolean;
    token: string;
    teamId: string;
  };
  tailwind: {
    enabled: boolean;
    config: 'default' | 'custom';
    customConfig: string;
  };
}

export interface CloudIntegration {
  enabled: boolean;
  providers: {
    aws: { enabled: boolean; accessKey: string; secretKey: string; region: string; };
    gcp: { enabled: boolean; projectId: string; keyFile: string; };
    azure: { enabled: boolean; subscriptionId: string; clientId: string; clientSecret: string; };
    firebase: { enabled: boolean; projectId: string; apiKey: string; };
    supabase: { enabled: boolean; url: string; anonKey: string; };
  };
}

export interface AnalyticsIntegration {
  enabled: boolean;
  providers: {
    googleAnalytics: { enabled: boolean; trackingId: string; };
    mixpanel: { enabled: boolean; token: string; };
    amplitude: { enabled: boolean; apiKey: string; };
    hotjar: { enabled: boolean; siteId: string; };
    posthog: { enabled: boolean; apiKey: string; };
  };
}

export interface SocialIntegration {
  enabled: boolean;
  providers: {
    twitter: { enabled: boolean; apiKey: string; apiSecret: string; };
    facebook: { enabled: boolean; appId: string; appSecret: string; };
    linkedin: { enabled: boolean; clientId: string; clientSecret: string; };
    discord: { enabled: boolean; botToken: string; guildId: string; };
    slack: { enabled: boolean; botToken: string; signingSecret: string; };
  };
}

export interface ThirdPartyIntegration {
  name: string;
  type: string;
  apiKey: string;
  config: Record<string, any>;
  enabled: boolean;
}

export interface StepProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  template: string;
  variables: string[];
  tags: string[];
  rating: number;
  usageCount: number;
}

export interface ProjectComplexity {
  level: 'simple' | 'moderate' | 'complex' | 'enterprise';
  estimatedHours: number;
  recommendedTeamSize: number;
  suggestedTimeline: string;
  riskFactors: string[];
}
