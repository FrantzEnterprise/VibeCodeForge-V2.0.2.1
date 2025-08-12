export interface ProjectData {
  // Step 1: Project Foundation
  name: string;
  email: string;
  phone: string;
  appName: string;
  description: string;

  // Step 2: Technical Specifications
  appType: string;
  customAppType: string;
  componentSelection: 'ai-suggest' | 'manual';
  customComponents: string[];
  additionalInfo: string;

  // Step 3: Assets
  referenceFiles: File[];
  logoFiles: File[];
  backgroundFile: File | null;

  // Step 4: Design
  designStyle: string;
  customStyle: string;
  colorScheme: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  typography: string;
  animationStyle: string;

  // Step 5: Integrations
  integrations: {
    email: EmailIntegration;
    autoresponder: AutoresponderIntegration;
    payment: PaymentIntegration;
    development: DevelopmentIntegration;
    cloud: CloudIntegration;
    analytics: AnalyticsIntegration;
    social: SocialIntegration;
  };
}

export interface EmailIntegration {
  enabled: boolean;
  provider: 'gmail' | 'outlook' | 'sendgrid' | 'mailgun' | 'ses' | '';
  apiKey: string;
  fromEmail: string;
  fromName: string;
}

export interface AutoresponderIntegration {
  enabled: boolean;
  provider: 'mailchimp' | 'convertkit' | 'activecampaign' | 'aweber' | 'getresponse' | '';
  apiKey: string;
  listId: string;
}

export interface PaymentIntegration {
  enabled: boolean;
  providers: {
    stripe: { enabled: boolean; publishableKey: string; secretKey: string; };
    paypal: { enabled: boolean; clientId: string; clientSecret: string; };
    square: { enabled: boolean; applicationId: string; accessToken: string; };
  };
  currency: string;
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
  };
}

export interface AnalyticsIntegration {
  enabled: boolean;
  providers: {
    googleAnalytics: { enabled: boolean; trackingId: string; };
    mixpanel: { enabled: boolean; token: string; };
    amplitude: { enabled: boolean; apiKey: string; };
    hotjar: { enabled: boolean; siteId: string; };
  };
}

export interface SocialIntegration {
  enabled: boolean;
  providers: {
    twitter: { enabled: boolean; apiKey: string; apiSecret: string; };
    facebook: { enabled: boolean; appId: string; appSecret: string; };
    linkedin: { enabled: boolean; clientId: string; clientSecret: string; };
    discord: { enabled: boolean; botToken: string; guildId: string; };
  };
}

export interface StepProps {
  data: ProjectData;
  updateData: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}
