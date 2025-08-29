// Traction channels definitions with detailed configurations

export const TRACTION_CHANNELS = [
  {
    id: 'targeting-blogs',
    name: 'Targeting Blogs',
    description: 'Monitor competitor blog targeting and content strategies',
    category: 'Content',
    icon: 'Edit',
    questions: [
      { key: 'blogPlatforms', label: 'Blog Platforms to Monitor', type: 'textarea', placeholder: 'Medium, Substack, company blogs, etc.' },
      { key: 'influencers', label: 'Key Industry Influencers', type: 'textarea', placeholder: 'Blogger names and handles' },
      { key: 'contentTypes', label: 'Content Types', type: 'textarea', placeholder: 'Technical posts, thought leadership, case studies' }
    ]
  },
  {
    id: 'publicity',
    name: 'Publicity',
    description: 'Track traditional media mentions and PR activities',
    category: 'PR',
    icon: 'Newspaper',
    questions: [
      { key: 'mediaSources', label: 'Media Sources', type: 'textarea', placeholder: 'TechCrunch, Wired, Forbes, etc.' },
      { key: 'journalists', label: 'Key Journalists', type: 'textarea', placeholder: 'Reporter names and publications' },
      { key: 'prTypes', label: 'PR Types to Monitor', type: 'textarea', placeholder: 'Product launches, funding announcements, partnerships' }
    ]
  },
  {
    id: 'unconventional-pr',
    name: 'Unconventional PR',
    description: 'Identify unique publicity stunts and viral campaigns',
    category: 'PR',
    icon: 'Zap',
    questions: [
      { key: 'socialPlatforms', label: 'Social Platforms for Stunts', type: 'textarea', placeholder: 'Twitter, LinkedIn, TikTok, etc.' },
      { key: 'stuntTypes', label: 'Types of Stunts', type: 'textarea', placeholder: 'Viral campaigns, guerrilla marketing, influencer collaborations' }
    ]
  },
  {
    id: 'search-marketing',
    name: 'Search Engine Marketing',
    description: 'Monitor competitor SEM campaigns and ad spend',
    category: 'Paid',
    icon: 'Search',
    questions: [
      { key: 'targetKeywords', label: 'Target Keywords to Monitor', type: 'textarea', placeholder: 'High-value keywords competitors bid on' },
      { key: 'platforms', label: 'Ad Platforms', type: 'textarea', placeholder: 'Google Ads, Bing Ads, etc.' },
      { key: 'adTypes', label: 'Ad Types', type: 'textarea', placeholder: 'Search ads, display ads, shopping ads' }
    ]
  },
  {
    id: 'social-display-ads',
    name: 'Social & Display Ads',
    description: 'Track social media advertising across platforms',
    category: 'Paid',
    icon: 'Share2',
    questions: [
      { key: 'socialPlatforms', label: 'Social Platforms', type: 'textarea', placeholder: 'LinkedIn, Facebook, Twitter, YouTube, etc.' },
      { key: 'adTypes', label: 'Ad Types to Monitor', type: 'textarea', placeholder: 'Video ads, carousel ads, sponsored content, etc.' },
      { key: 'targeting', label: 'Targeting Strategies', type: 'textarea', placeholder: 'Demographics, interests, job titles, etc.' }
    ]
  },
  {
    id: 'offline-ads',
    name: 'Offline Ads',
    description: 'Monitor traditional advertising channels',
    category: 'Paid',
    icon: 'Radio',
    questions: [
      { key: 'channels', label: 'Offline Channels', type: 'textarea', placeholder: 'Radio, TV, billboards, print media' },
      { key: 'markets', label: 'Geographic Markets', type: 'textarea', placeholder: 'Cities, regions, countries to monitor' }
    ]
  },
  {
    id: 'seo',
    name: 'Search Engine Optimization',
    description: 'Track organic search performance and strategy',
    category: 'Organic',
    icon: 'TrendingUp',
    questions: [
      { key: 'targetKeywords', label: 'SEO Keywords to Track', type: 'textarea', placeholder: 'Keywords for ranking monitoring' },
      { key: 'contentTypes', label: 'Content Types', type: 'textarea', placeholder: 'Blog posts, landing pages, resources, etc.' },
      { key: 'seoTools', label: 'SEO Tools Integration', type: 'textarea', placeholder: 'Ahrefs, SEMrush, Moz data sources' }
    ]
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    description: 'Monitor content strategy and performance',
    category: 'Content',
    icon: 'FileText',
    questions: [
      { key: 'contentTypes', label: 'Content Types to Monitor', type: 'textarea', placeholder: 'Whitepapers, case studies, webinars, etc.' },
      { key: 'distributionChannels', label: 'Distribution Channels', type: 'textarea', placeholder: 'Where content is shared and promoted' },
      { key: 'contentFormats', label: 'Content Formats', type: 'textarea', placeholder: 'Video, audio, interactive, infographics' }
    ]
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Track email campaigns and automation',
    category: 'Direct',
    icon: 'Mail',
    questions: [
      { key: 'campaignTypes', label: 'Campaign Types', type: 'textarea', placeholder: 'Newsletters, drip campaigns, promotional emails' },
      { key: 'emailTools', label: 'Email Tools', type: 'textarea', placeholder: 'Mailchimp, HubSpot, Marketo, etc.' }
    ]
  },
  {
    id: 'engineering-marketing',
    name: 'Engineering as Marketing',
    description: 'Monitor free tools and widgets deployment',
    category: 'Product',
    icon: 'Code',
    questions: [
      { key: 'toolTypes', label: 'Tool Types', type: 'textarea', placeholder: 'Calculators, widgets, microsites, APIs' },
      { key: 'platforms', label: 'Distribution Platforms', type: 'textarea', placeholder: 'GitHub, product websites, app stores' }
    ]
  },
  {
    id: 'viral-marketing',
    name: 'Viral Marketing',
    description: 'Track referral programs and viral mechanisms',
    category: 'Growth',
    icon: 'Users',
    questions: [
      { key: 'viralMechanisms', label: 'Viral Mechanisms', type: 'textarea', placeholder: 'Referral programs, social sharing, gamification' },
      { key: 'incentives', label: 'Incentive Types', type: 'textarea', placeholder: 'Credits, discounts, premium features' }
    ]
  },
  {
    id: 'business-development',
    name: 'Business Development',
    description: 'Monitor partnerships and strategic alliances',
    category: 'Partnerships',
    icon: 'Handshake',
    questions: [
      { key: 'partnerTypes', label: 'Partnership Types', type: 'textarea', placeholder: 'Integrations, reseller programs, strategic alliances' },
      { key: 'partnerPlatforms', label: 'Partner Platforms', type: 'textarea', placeholder: 'App stores, marketplaces, partner directories' },
      { key: 'dealTypes', label: 'Deal Types', type: 'textarea', placeholder: 'Technology partnerships, channel partnerships, joint ventures' }
    ]
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Track sales processes and team activities',
    category: 'Direct',
    icon: 'DollarSign',
    questions: [
      { key: 'salesChannels', label: 'Sales Channels', type: 'textarea', placeholder: 'Inside sales, field sales, channel partners' },
      { key: 'salesTools', label: 'Sales Tools', type: 'textarea', placeholder: 'CRM systems, sales automation, prospecting tools' }
    ]
  },
  {
    id: 'affiliate-programs',
    name: 'Affiliate Programs',
    description: 'Monitor affiliate and partner programs',
    category: 'Partnerships',
    icon: 'Link',
    questions: [
      { key: 'affiliateNetworks', label: 'Affiliate Networks', type: 'textarea', placeholder: 'Commission Junction, ShareASale, Impact' },
      { key: 'commissionStructure', label: 'Commission Structures', type: 'textarea', placeholder: 'Percentage, fixed fee, tiered commissions' }
    ]
  },
  {
    id: 'existing-platforms',
    name: 'Existing Platforms',
    description: 'Track platform integrations and marketplace presence',
    category: 'Platform',
    icon: 'Layers',
    questions: [
      { key: 'platforms', label: 'Platforms to Monitor', type: 'textarea', placeholder: 'App stores, marketplaces, integration platforms' },
      { key: 'integrationTypes', label: 'Integration Types', type: 'textarea', placeholder: 'Native integrations, API connections, plugins' }
    ]
  },
  {
    id: 'trade-shows',
    name: 'Trade Shows',
    description: 'Monitor industry events and exhibition participation',
    category: 'Events',
    icon: 'Calendar',
    questions: [
      { key: 'events', label: 'Key Industry Events', type: 'textarea', placeholder: 'Conference names and dates' },
      { key: 'exhibitionTypes', label: 'Exhibition Types', type: 'textarea', placeholder: 'Booths, sponsorships, speaking slots' },
      { key: 'eventCategories', label: 'Event Categories', type: 'textarea', placeholder: 'Industry conferences, user conferences, trade shows' }
    ]
  },
  {
    id: 'offline-events',
    name: 'Offline Events',
    description: 'Track meetups, conferences, and community events',
    category: 'Events',
    icon: 'MapPin',
    questions: [
      { key: 'eventTypes', label: 'Event Types', type: 'textarea', placeholder: 'Meetups, workshops, user groups, hackathons' },
      { key: 'platforms', label: 'Event Platforms', type: 'textarea', placeholder: 'Meetup.com, Eventbrite, custom events' }
    ]
  },
  {
    id: 'speaking-engagements',
    name: 'Speaking Engagements',
    description: 'Monitor thought leadership and speaking activities',
    category: 'Thought Leadership',
    icon: 'Mic',
    questions: [
      { key: 'eventTypes', label: 'Speaking Event Types', type: 'textarea', placeholder: 'Conferences, webinars, podcasts, panels' },
      { key: 'topics', label: 'Speaking Topics', type: 'textarea', placeholder: 'Industry trends, technical topics, leadership' }
    ]
  },
  {
    id: 'community-building',
    name: 'Community Building',
    description: 'Track community initiatives and user engagement',
    category: 'Community',
    icon: 'Users',
    questions: [
      { key: 'platforms', label: 'Community Platforms', type: 'textarea', placeholder: 'Slack, Discord, Reddit, Stack Overflow, etc.' },
      { key: 'communityTypes', label: 'Community Types', type: 'textarea', placeholder: 'User groups, developer communities, etc.' },
      { key: 'engagementTypes', label: 'Engagement Types', type: 'textarea', placeholder: 'Forums, AMAs, user-generated content, events' }
    ]
  }
];

// Base questions that apply to all channels
export const BASE_QUESTIONS = [
  { key: 'competitors', label: 'Primary Competitors to Monitor', type: 'textarea', placeholder: 'List key competitors (one per line)' },
  { key: 'keywords', label: 'Industry Keywords & Terms', type: 'textarea', placeholder: 'Key terms for monitoring (one per line)' },
  { key: 'frequency', label: 'Monitoring Frequency', type: 'select', options: ['Hourly', 'Daily', 'Weekly'] },
  { key: 'priority', label: 'Priority Level', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'] },
  { key: 'languages', label: 'Languages to Monitor', type: 'multiselect', options: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'pt', 'it', 'nl', 'ar', 'hi'] }
];

// Get complete questions for a channel
export const getChannelQuestions = (channelId) => {
  const channel = TRACTION_CHANNELS.find(c => c.id === channelId);
  if (!channel) return BASE_QUESTIONS;
  
  return [...BASE_QUESTIONS, ...channel.questions];
};

export default TRACTION_CHANNELS;
