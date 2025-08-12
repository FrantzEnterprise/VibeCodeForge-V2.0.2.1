import React from 'react';
import { motion } from 'framer-motion';
import { Mail, CreditCard, Github, Cloud, BarChart3, Share2, Settings } from 'lucide-react';
import { StepNavigation } from '../components/StepNavigation';
import { FormData } from '../types/FormData';

interface Step6IntegrationsProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export const Step6Integrations: React.FC<Step6IntegrationsProps> = ({
  data,
  updateData,
  onNext,
  onBack,
  isValid
}) => {
  const handleIntegrationToggle = (category: keyof FormData['integrations']) => {
    const currentIntegrations = data.integrations;
    updateData({
      integrations: {
        ...currentIntegrations,
        [category]: {
          ...currentIntegrations[category],
          enabled: !currentIntegrations[category].enabled
        }
      }
    });
  };

  const handleIntegrationUpdate = (
    category: keyof FormData['integrations'],
    field: string,
    value: any
  ) => {
    const currentIntegrations = data.integrations;
    updateData({
      integrations: {
        ...currentIntegrations,
        [category]: {
          ...currentIntegrations[category],
          [field]: value
        }
      }
    });
  };

  const IntegrationSection: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
    category: keyof FormData['integrations'];
    children?: React.ReactNode;
  }> = ({ title, description, icon, category, children }) => {
    const isEnabled = data.integrations[category]?.enabled || false;

    return (
      <div className="glass-subtle p-6 rounded-xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-slate-400">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
              <p className="text-slate-400 text-sm">{description}</p>
            </div>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={() => handleIntegrationToggle(category)}
            />
            <span className="toggle-slider"></span>
          </div>
        </div>
        
        {isEnabled && children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    );
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
        <h2 className="step-title">Integrations & Services</h2>
        <p className="step-description">
          Configure third-party integrations and services for "{data.appName}". 
          Enable only the services you need for your project.
        </p>
      </div>

      <div className="step-content space-y-6">
        {/* Email Integration */}
        <IntegrationSection
          title="Email Service"
          description="Send transactional emails and notifications"
          icon={<Mail size={24} />}
          category="email"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Email Provider</label>
              <select
                className="form-input"
                value={data.integrations.email.provider}
                onChange={(e) => handleIntegrationUpdate('email', 'provider', e.target.value)}
              >
                <option value="">Select provider</option>
                <option value="sendgrid">SendGrid</option>
                <option value="mailgun">Mailgun</option>
                <option value="ses">Amazon SES</option>
                <option value="gmail">Gmail SMTP</option>
                <option value="outlook">Outlook SMTP</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">From Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="noreply@yourapp.com"
                value={data.integrations.email.fromEmail}
                onChange={(e) => handleIntegrationUpdate('email', 'fromEmail', e.target.value)}
              />
            </div>
          </div>
        </IntegrationSection>

        {/* Payment Integration */}
        <IntegrationSection
          title="Payment Processing"
          description="Accept payments and manage subscriptions"
          icon={<CreditCard size={24} />}
          category="payment"
        >
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.payment.providers.stripe.enabled}
                  onChange={(e) => handleIntegrationUpdate('payment', 'providers', {
                    ...data.integrations.payment.providers,
                    stripe: { ...data.integrations.payment.providers.stripe, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Stripe</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.payment.providers.paypal.enabled}
                  onChange={(e) => handleIntegrationUpdate('payment', 'providers', {
                    ...data.integrations.payment.providers,
                    paypal: { ...data.integrations.payment.providers.paypal, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">PayPal</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.payment.providers.square.enabled}
                  onChange={(e) => handleIntegrationUpdate('payment', 'providers', {
                    ...data.integrations.payment.providers,
                    square: { ...data.integrations.payment.providers.square, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Square</label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Default Currency</label>
              <select
                className="form-input"
                value={data.integrations.payment.currency}
                onChange={(e) => handleIntegrationUpdate('payment', 'currency', e.target.value)}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>
          </div>
        </IntegrationSection>

        {/* Development Integration */}
        <IntegrationSection
          title="Development Tools"
          description="Version control and deployment automation"
          icon={<Github size={24} />}
          category="development"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data.integrations.development.github.enabled}
                onChange={(e) => handleIntegrationUpdate('development', 'github', {
                  ...data.integrations.development.github,
                  enabled: e.target.checked
                })}
              />
              <label className="text-slate-200">GitHub Integration</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data.integrations.development.vercel.enabled}
                onChange={(e) => handleIntegrationUpdate('development', 'vercel', {
                  ...data.integrations.development.vercel,
                  enabled: e.target.checked
                })}
              />
              <label className="text-slate-200">Vercel Deployment</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={data.integrations.development.tailwind.enabled}
                onChange={(e) => handleIntegrationUpdate('development', 'tailwind', {
                  ...data.integrations.development.tailwind,
                  enabled: e.target.checked
                })}
              />
              <label className="text-slate-200">Tailwind CSS</label>
            </div>
          </div>
        </IntegrationSection>

        {/* Cloud Integration */}
        <IntegrationSection
          title="Cloud Services"
          description="Database, storage, and backend services"
          icon={<Cloud size={24} />}
          category="cloud"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.cloud.providers.firebase.enabled}
                  onChange={(e) => handleIntegrationUpdate('cloud', 'providers', {
                    ...data.integrations.cloud.providers,
                    firebase: { ...data.integrations.cloud.providers.firebase, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Firebase</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.cloud.providers.supabase.enabled}
                  onChange={(e) => handleIntegrationUpdate('cloud', 'providers', {
                    ...data.integrations.cloud.providers,
                    supabase: { ...data.integrations.cloud.providers.supabase, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Supabase</label>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.cloud.providers.aws.enabled}
                  onChange={(e) => handleIntegrationUpdate('cloud', 'providers', {
                    ...data.integrations.cloud.providers,
                    aws: { ...data.integrations.cloud.providers.aws, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">AWS</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.cloud.providers.gcp.enabled}
                  onChange={(e) => handleIntegrationUpdate('cloud', 'providers', {
                    ...data.integrations.cloud.providers,
                    gcp: { ...data.integrations.cloud.providers.gcp, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Google Cloud</label>
              </div>
            </div>
          </div>
        </IntegrationSection>

        {/* Analytics Integration */}
        <IntegrationSection
          title="Analytics & Tracking"
          description="Monitor user behavior and application performance"
          icon={<BarChart3 size={24} />}
          category="analytics"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.analytics.providers.googleAnalytics.enabled}
                  onChange={(e) => handleIntegrationUpdate('analytics', 'providers', {
                    ...data.integrations.analytics.providers,
                    googleAnalytics: { ...data.integrations.analytics.providers.googleAnalytics, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Google Analytics</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.analytics.providers.mixpanel.enabled}
                  onChange={(e) => handleIntegrationUpdate('analytics', 'providers', {
                    ...data.integrations.analytics.providers,
                    mixpanel: { ...data.integrations.analytics.providers.mixpanel, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Mixpanel</label>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.analytics.providers.hotjar.enabled}
                  onChange={(e) => handleIntegrationUpdate('analytics', 'providers', {
                    ...data.integrations.analytics.providers,
                    hotjar: { ...data.integrations.analytics.providers.hotjar, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Hotjar</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.analytics.providers.posthog.enabled}
                  onChange={(e) => handleIntegrationUpdate('analytics', 'providers', {
                    ...data.integrations.analytics.providers,
                    posthog: { ...data.integrations.analytics.providers.posthog, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">PostHog</label>
              </div>
            </div>
          </div>
        </IntegrationSection>

        {/* Social Integration */}
        <IntegrationSection
          title="Social Media"
          description="Social login and content sharing"
          icon={<Share2 size={24} />}
          category="social"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.social.providers.twitter.enabled}
                  onChange={(e) => handleIntegrationUpdate('social', 'providers', {
                    ...data.integrations.social.providers,
                    twitter: { ...data.integrations.social.providers.twitter, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Twitter/X</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.social.providers.facebook.enabled}
                  onChange={(e) => handleIntegrationUpdate('social', 'providers', {
                    ...data.integrations.social.providers,
                    facebook: { ...data.integrations.social.providers.facebook, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Facebook</label>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.social.providers.linkedin.enabled}
                  onChange={(e) => handleIntegrationUpdate('social', 'providers', {
                    ...data.integrations.social.providers,
                    linkedin: { ...data.integrations.social.providers.linkedin, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">LinkedIn</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={data.integrations.social.providers.discord.enabled}
                  onChange={(e) => handleIntegrationUpdate('social', 'providers', {
                    ...data.integrations.social.providers,
                    discord: { ...data.integrations.social.providers.discord, enabled: e.target.checked }
                  })}
                />
                <label className="text-slate-200">Discord</label>
              </div>
            </div>
          </div>
        </IntegrationSection>

        {/* Integration Summary */}
        <div className="glass-subtle p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-slate-100 mb-4">Integration Summary</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Enabled Services:</span>
              <p className="text-slate-200 font-medium">
                {Object.values(data.integrations).filter(integration => integration.enabled).length}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Payment Methods:</span>
              <p className="text-slate-200 font-medium">
                {Object.values(data.integrations.payment.providers).filter(provider => provider.enabled).length}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Analytics Tools:</span>
              <p className="text-slate-200 font-medium">
                {Object.values(data.integrations.analytics.providers).filter(provider => provider.enabled).length}
              </p>
            </div>
          </div>
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
