import { FormData } from '../types';

export const generatePrompt = (data: FormData): string => {
  const sections: string[] = [];

  // Header
  sections.push('# AI PROMPT ARCHITECT SPECIFICATION');
  sections.push('');

  // Author Information
  if (data.author) {
    sections.push('## AUTHOR PROFILE');
    sections.push(`**Name:** ${data.author.name || 'Not specified'}`);
    sections.push(`**Role:** ${data.author.role || 'Not specified'}`);
    sections.push(`**Company:** ${data.author.company || 'Not specified'}`);
    sections.push(`**Experience Level:** ${data.author.experience || 'Not specified'}`);
    if (data.author.bio) {
      sections.push(`**Bio:** ${data.author.bio}`);
    }
    sections.push('');
  }

  // Project Information
  if (data.project) {
    sections.push('## PROJECT OVERVIEW');
    sections.push(`**Project Type:** ${data.project.type || 'Not specified'}`);
    sections.push(`**Project Name:** ${data.project.name || 'Not specified'}`);
    sections.push(`**Description:** ${data.project.description || 'Not specified'}`);
    
    if (data.project.goals && data.project.goals.length > 0) {
      sections.push('**Goals:**');
      data.project.goals.forEach(goal => {
        sections.push(`- ${goal}`);
      });
    }
    
    if (data.project.targetAudience) {
      sections.push(`**Target Audience:** ${data.project.targetAudience}`);
    }
    
    if (data.project.timeline) {
      sections.push(`**Timeline:** ${data.project.timeline}`);
    }
    
    if (data.project.budget) {
      sections.push(`**Budget:** ${data.project.budget}`);
    }
    sections.push('');
  }

  // Technical Specifications
  if (data.technical) {
    sections.push('## TECHNICAL SPECIFICATIONS');
    
    if (data.technical.framework) {
      sections.push(`**Framework:** ${data.technical.framework}`);
    }
    
    if (data.technical.language) {
      sections.push(`**Programming Language:** ${data.technical.language}`);
    }
    
    if (data.technical.database) {
      sections.push(`**Database:** ${data.technical.database}`);
    }
    
    if (data.technical.hosting) {
      sections.push(`**Hosting Platform:** ${data.technical.hosting}`);
    }
    
    if (data.technical.features && data.technical.features.length > 0) {
      sections.push('**Required Features:**');
      data.technical.features.forEach(feature => {
        sections.push(`- ${feature}`);
      });
    }
    
    if (data.technical.performance) {
      sections.push(`**Performance Requirements:** ${data.technical.performance}`);
    }
    
    if (data.technical.security) {
      sections.push(`**Security Requirements:** ${data.technical.security}`);
    }
    
    if (data.technical.scalability) {
      sections.push(`**Scalability Requirements:** ${data.technical.scalability}`);
    }
    sections.push('');
  }

  // AI Persona for Website Writing
  sections.push('## AI PERSONA FOR WEBSITE WRITING');
  sections.push('You are an expert website content creator and digital strategist with the following characteristics:');
  sections.push('');
  sections.push('**Core Identity:**');
  sections.push('- Professional web content specialist with 10+ years of experience');
  sections.push('- Expert in conversion-focused copywriting and user experience design');
  sections.push('- Deep understanding of SEO, content marketing, and digital psychology');
  sections.push('- Skilled in creating compelling narratives that drive user engagement');
  sections.push('');
  sections.push('**Writing Style:**');
  sections.push('- Clear, concise, and action-oriented language');
  sections.push('- Persuasive yet authentic tone that builds trust');
  sections.push('- Optimized for both human readers and search engines');
  sections.push('- Adaptable voice that matches brand personality');
  sections.push('');
  sections.push('**Expertise Areas:**');
  sections.push('- Landing page optimization and conversion rate improvement');
  sections.push('- User journey mapping and content strategy');
  sections.push('- A/B testing methodologies for content performance');
  sections.push('- Cross-platform content adaptation and distribution');
  sections.push('');

  // Topic Persona
  if (data.project?.type) {
    sections.push('## TOPIC PERSONA & DOMAIN EXPERTISE');
    sections.push(`**Primary Domain:** ${data.project.type}`);
    sections.push('');
    sections.push('**Domain-Specific Knowledge:**');
    
    switch (data.project.type) {
      case 'e-commerce':
        sections.push('- E-commerce best practices and conversion optimization');
        sections.push('- Product catalog management and merchandising');
        sections.push('- Payment processing and checkout optimization');
        sections.push('- Customer retention and loyalty programs');
        sections.push('- Inventory management and fulfillment strategies');
        break;
      case 'saas':
        sections.push('- SaaS business models and subscription strategies');
        sections.push('- User onboarding and feature adoption');
        sections.push('- Freemium vs premium pricing strategies');
        sections.push('- Customer success and churn reduction');
        sections.push('- API documentation and developer experience');
        break;
      case 'blog':
        sections.push('- Content marketing and editorial calendars');
        sections.push('- SEO optimization and keyword research');
        sections.push('- Audience engagement and community building');
        sections.push('- Monetization strategies for content creators');
        sections.push('- Social media integration and distribution');
        break;
      case 'portfolio':
        sections.push('- Personal branding and professional positioning');
        sections.push('- Visual storytelling and case study presentation');
        sections.push('- Client acquisition and networking strategies');
        sections.push('- Skills demonstration and credibility building');
        sections.push('- Career development and industry trends');
        break;
      case 'landing-page':
        sections.push('- Conversion rate optimization and A/B testing');
        sections.push('- Lead generation and capture strategies');
        sections.push('- Sales funnel design and user flow optimization');
        sections.push('- Call-to-action placement and messaging');
        sections.push('- Performance tracking and analytics');
        break;
      default:
        sections.push('- Industry-specific best practices and standards');
        sections.push('- User experience design principles');
        sections.push('- Content strategy and information architecture');
        sections.push('- Performance optimization and accessibility');
        sections.push('- Modern web development practices');
    }
    sections.push('');
  }

  // Vibe and Style
  if (data.vibe) {
    sections.push('## DESIGN & BRAND VIBE');
    sections.push(`**Primary Style:** ${data.vibe.style || 'Not specified'}`);
    sections.push(`**Color Scheme:** ${data.vibe.colors || 'Not specified'}`);
    sections.push(`**Typography:** ${data.vibe.typography || 'Not specified'}`);
    sections.push(`**Mood:** ${data.vibe.mood || 'Not specified'}`);
    
    if (data.vibe.inspiration) {
      sections.push(`**Inspiration:** ${data.vibe.inspiration}`);
    }
    
    if (data.vibe.keywords && data.vibe.keywords.length > 0) {
      sections.push('**Style Keywords:**');
      data.vibe.keywords.forEach(keyword => {
        sections.push(`- ${keyword}`);
      });
    }
    sections.push('');
  }

  // Content Strategy & Requirements
  sections.push('## CONTENT STRATEGY & REQUIREMENTS');
  sections.push('');
  sections.push('**Content Principles:**');
  sections.push('- User-centric approach with clear value propositions');
  sections.push('- Scannable content with proper hierarchy and formatting');
  sections.push('- Mobile-first responsive design considerations');
  sections.push('- Accessibility compliance (WCAG 2.1 AA standards)');
  sections.push('- Performance optimization for fast loading times');
  sections.push('');
  sections.push('**SEO Requirements:**');
  sections.push('- Keyword-optimized headings and meta descriptions');
  sections.push('- Structured data markup for rich snippets');
  sections.push('- Internal linking strategy for improved navigation');
  sections.push('- Image optimization with descriptive alt text');
  sections.push('- Page speed optimization and Core Web Vitals');
  sections.push('');

  // Integrations
  if (data.integrations) {
    sections.push('## INTEGRATIONS & SERVICES');
    
    Object.entries(data.integrations).forEach(([category, config]) => {
      if (config && typeof config === 'object' && 'enabled' in config && config.enabled) {
        sections.push(`**${category.charAt(0).toUpperCase() + category.slice(1)}:**`);
        Object.entries(config).forEach(([key, value]) => {
          if (key !== 'enabled' && value) {
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            if (Array.isArray(value)) {
              sections.push(`- ${formattedKey}: ${value.join(', ')}`);
            } else {
              sections.push(`- ${formattedKey}: ${value}`);
            }
          }
        });
        sections.push('');
      }
    });
  }

  // Implementation Guidelines
  sections.push('## IMPLEMENTATION GUIDELINES');
  sections.push('');
  sections.push('**Development Approach:**');
  sections.push('- Follow modern web development best practices');
  sections.push('- Implement responsive design with mobile-first methodology');
  sections.push('- Use semantic HTML5 elements for better accessibility');
  sections.push('- Optimize for performance with lazy loading and code splitting');
  sections.push('- Implement proper error handling and user feedback');
  sections.push('');
  sections.push('**Quality Assurance:**');
  sections.push('- Cross-browser compatibility testing');
  sections.push('- Performance auditing with Lighthouse');
  sections.push('- Accessibility testing with screen readers');
  sections.push('- Security best practices implementation');
  sections.push('- Code review and documentation standards');
  sections.push('');

  // Success Metrics
  sections.push('## SUCCESS METRICS & KPIs');
  sections.push('');
  sections.push('**Performance Metrics:**');
  sections.push('- Page load time under 3 seconds');
  sections.push('- Core Web Vitals scores in "Good" range');
  sections.push('- Mobile responsiveness across all devices');
  sections.push('- SEO score above 90 in Lighthouse');
  sections.push('- Accessibility score above 95 in Lighthouse');
  sections.push('');
  sections.push('**Business Metrics:**');
  sections.push('- User engagement and time on site');
  sections.push('- Conversion rate optimization targets');
  sections.push('- Search engine ranking improvements');
  sections.push('- User satisfaction and feedback scores');
  sections.push('- Return visitor rate and user retention');
  sections.push('');

  // Final Instructions
  sections.push('## FINAL INSTRUCTIONS');
  sections.push('');
  sections.push('**Your Mission:**');
  sections.push('Create a comprehensive, professional, and highly effective website that exceeds user expectations and achieves all specified business objectives. Focus on delivering exceptional user experience, optimal performance, and measurable results.');
  sections.push('');
  sections.push('**Key Deliverables:**');
  sections.push('- Complete website structure with all specified pages');
  sections.push('- Responsive design optimized for all devices');
  sections.push('- SEO-optimized content and technical implementation');
  sections.push('- Integration of all specified services and tools');
  sections.push('- Performance-optimized and accessible codebase');
  sections.push('- Documentation for maintenance and updates');
  sections.push('');
  sections.push('**Quality Standards:**');
  sections.push('- Professional-grade code quality and organization');
  sections.push('- Comprehensive testing and quality assurance');
  sections.push('- Security best practices implementation');
  sections.push('- Scalable architecture for future growth');
  sections.push('- User-centric design and experience optimization');

  return sections.join('\n');
};
