// Comprehensive pre-populated configurations for different verticals and geographies

export const GEOGRAPHIES = [
  { id: 'north-america', name: 'North America', code: 'NA', languages: ['en', 'es', 'fr'] },
  { id: 'europe', name: 'Europe', code: 'EU', languages: ['en', 'de', 'fr', 'es', 'it', 'nl'] },
  { id: 'asia-pacific', name: 'Asia Pacific', code: 'APAC', languages: ['en', 'zh', 'ja', 'ko', 'hi'] },
  { id: 'latin-america', name: 'Latin America', code: 'LATAM', languages: ['es', 'pt', 'en'] },
  { id: 'middle-east-africa', name: 'Middle East & Africa', code: 'MEA', languages: ['en', 'ar', 'fr'] },
  { id: 'global', name: 'Global', code: 'GLOBAL', languages: ['en'] }
];

export const VERTICAL_CONFIGURATIONS = {
  'Enterprise SaaS': {
    'north-america': {
      competitors: [
        'Salesforce', 'Microsoft', 'Oracle', 'SAP', 'Workday', 'ServiceNow', 'Adobe', 
        'Zoom', 'Slack', 'Atlassian', 'HubSpot', 'Zendesk', 'DocuSign', 'Snowflake'
      ],
      keywords: [
        'enterprise software', 'SaaS', 'cloud computing', 'digital transformation',
        'CRM', 'ERP', 'HR technology', 'customer success', 'automation'
      ],
      mediaSources: [
        'TechCrunch', 'VentureBeat', 'Forbes Tech', 'Wall Street Journal Tech',
        'Information', 'Protocol', 'SaaStr', 'Crunchbase News'
      ],
      journalists: [
        'Ron Miller (TechCrunch)', 'Ingrid Lunden (TechCrunch)', 'Alex Wilhelm (TechCrunch)',
        'Jessica Lyons Hardcastle (VentureBeat)', 'Kyle Wiggers (VentureBeat)'
      ],
      tradeShows: [
        'SaaStr Annual', 'Salesforce Dreamforce', 'Microsoft Ignite', 'Oracle OpenWorld',
        'AWS re:Invent', 'Google Cloud Next', 'ServiceNow Knowledge'
      ],
      frequency: 'Daily',
      languages: ['en']
    },
    'europe': {
      competitors: [
        'SAP', 'Sage', 'TeamViewer', 'Celonis', 'UiPath', 'Personio', 'Contentful',
        'GetYourGuide', 'SumUp', 'Klarna', 'Spotify', 'HelloFresh', 'Delivery Hero'
      ],
      keywords: [
        'enterprise software', 'SaaS', 'digital transformation', 'GDPR compliance',
        'European cloud', 'fintech', 'HR tech', 'process mining'
      ],
      mediaSources: [
        'TechCrunch Europe', 'Sifted', 'Tech.eu', 'EU-Startups', 'The Memo',
        'ComputerWeekly', 'Silicon Republic'
      ],
      journalists: [
        'Natasha Lomas (TechCrunch)', 'Mike Butcher (TechCrunch)', 'Omar Faridi (Crowdfund Insider)'
      ],
      tradeShows: [
        'Web Summit', 'TechCrunch Disrupt Berlin', 'SAPPHIRE NOW', 'dmexco',
        'Nordic Tech Tour', 'Slush'
      ],
      frequency: 'Daily',
      languages: ['en', 'de', 'fr']
    }
  },
  
  'DevTools': {
    'north-america': {
      competitors: [
        'GitHub', 'GitLab', 'Atlassian (Jira/Confluence)', 'JetBrains', 'Docker',
        'HashiCorp', 'MongoDB', 'Databricks', 'Twilio', 'Stripe', 'Auth0',
        'Vercel', 'Netlify', 'PlanetScale', 'Supabase'
      ],
      keywords: [
        'developer tools', 'DevOps', 'CI/CD', 'API development', 'cloud native',
        'microservices', 'containerization', 'infrastructure as code', 'observability'
      ],
      mediaSources: [
        'TechCrunch', 'The New Stack', 'InfoQ', 'DevOps.com', 'DZone',
        'Hacker News', 'Reddit r/programming', 'Dev.to'
      ],
      journalists: [
        'Frederic Lardinois (TechCrunch)', 'Alex Williams (The New Stack)',
        'Lawrence Hecht (The New Stack)'
      ],
      tradeShows: [
        'KubeCon + CloudNativeCon', 'DockerCon', 'GitHub Universe', 'AWS re:Invent',
        'Google I/O', 'Microsoft Build', 'HashiConf'
      ],
      frequency: 'Daily',
      languages: ['en']
    },
    'europe': {
      competitors: [
        'GitLab', 'JetBrains', 'TeamCity', 'Octopus Deploy', 'Elastic',
        'Grafana Labs', 'InfluxData', 'Checkly', 'Postman', 'Insomnia'
      ],
      keywords: [
        'developer tools', 'DevOps', 'European tech', 'open source',
        'monitoring', 'testing', 'API tools', 'developer experience'
      ],
      mediaSources: [
        'The New Stack', 'InfoQ', 'JAXenter', 'heise Developer',
        'ITespresso', 'Silicon Republic'
      ],
      journalists: [
        'Jennifer Riggins (The New Stack)', 'Susan Hall (The New Stack)'
      ],
      tradeShows: [
        'KubeCon + CloudNativeCon Europe', 'FOSDEM', 'DevOpsDays',
        'Devoxx', 'JAX DevOps'
      ],
      frequency: 'Daily',
      languages: ['en', 'de']
    }
  },

  'FinTech': {
    'north-america': {
      competitors: [
        'Stripe', 'Square', 'PayPal', 'Coinbase', 'Robinhood', 'Plaid',
        'Chime', 'Affirm', 'Klarna', 'Brex', 'Mercury', 'Ramp', 'Carta'
      ],
      keywords: [
        'fintech', 'digital payments', 'cryptocurrency', 'neobanking',
        'lending', 'wealth management', 'regulatory compliance', 'KYC', 'AML'
      ],
      mediaSources: [
        'TechCrunch', 'American Banker', 'PaymentsSource', 'Fintech News',
        'The Block', 'CoinDesk', 'Banking Dive'
      ],
      journalists: [
        'Mary Ann Azevedo (TechCrunch)', 'Christine Hall (TechCrunch)',
        'Lucas Matney (TechCrunch)'
      ],
      tradeShows: [
        'Money20/20', 'Fintech Meetup', 'LendIt Fintech', 'Consensus',
        'Digital Banking Summit', 'Payments Canada Summit'
      ],
      frequency: 'Daily',
      languages: ['en', 'es']
    },
    'europe': {
      competitors: [
        'Klarna', 'Adyen', 'Revolut', 'N26', 'Monzo', 'Starling Bank',
        'Wise', 'GoCardless', 'TrueLayer', 'Zopa', 'Funding Circle'
      ],
      keywords: [
        'fintech', 'open banking', 'PSD2', 'digital banking', 'payments',
        'challenger banks', 'regulatory sandbox', 'FCA', 'GDPR'
      ],
      mediaSources: [
        'Fintech Futures', 'AltFi', 'The Paypers', 'Sifted', 'TechCrunch Europe'
      ],
      journalists: [
        'Natasha Lomas (TechCrunch)', 'Steve O\'Hear (TechCrunch)'
      ],
      tradeShows: [
        'Money20/20 Europe', 'Fintech Week London', 'Paris Fintech Forum',
        'Nordic Fintech Week', 'Web Summit'
      ],
      frequency: 'Daily',
      languages: ['en', 'de', 'fr']
    }
  },

  'HealthTech': {
    'north-america': {
      competitors: [
        'Teladoc', 'Amwell', 'Epic Systems', 'Cerner', 'Veracyte',
        '23andMe', 'Ro', 'Hims & Hers', 'Cedar', 'Flatiron Health'
      ],
      keywords: [
        'digital health', 'telemedicine', 'EHR', 'healthcare AI',
        'medical devices', 'clinical trials', 'HIPAA', 'FDA approval'
      ],
      mediaSources: [
        'STAT News', 'Healthcare Dive', 'MobiHealthNews', 'TechCrunch',
        'Modern Healthcare', 'Healthcare IT News'
      ],
      journalists: [
        'Christina Farr (STAT)', 'Alyssa Danigelis (TechCrunch)',
        'Natasha Mascarenhas (TechCrunch)'
      ],
      tradeShows: [
        'HIMSS', 'JP Morgan Healthcare Conference', 'CES Health Tech',
        'Digital Health Summit', 'HLTH'
      ],
      frequency: 'Daily',
      languages: ['en']
    }
  },

  'AI/ML Tools': {
    'north-america': {
      competitors: [
        'OpenAI', 'Anthropic', 'Cohere', 'Hugging Face', 'Scale AI',
        'DataRobot', 'H2O.ai', 'Databricks', 'Weights & Biases', 'Runway'
      ],
      keywords: [
        'artificial intelligence', 'machine learning', 'generative AI',
        'large language models', 'computer vision', 'MLOps', 'AutoML'
      ],
      mediaSources: [
        'TechCrunch', 'VentureBeat AI', 'The Information', 'AI News',
        'Towards Data Science', 'MIT Technology Review'
      ],
      journalists: [
        'Kyle Wiggers (VentureBeat)', 'Devin Coldewey (TechCrunch)',
        'Natasha Lomas (TechCrunch)'
      ],
      tradeShows: [
        'NeurIPS', 'ICML', 'AI Summit', 'Strata Data Conference',
        'Transform by VentureBeat', 'AI World'
      ],
      frequency: 'Hourly',
      languages: ['en']
    },
    'europe': {
      competitors: [
        'DeepMind', 'Stability AI', 'Mistral AI', 'Aleph Alpha',
        'Snorkel AI', 'Graphcore', 'SoundHound'
      ],
      keywords: [
        'artificial intelligence', 'European AI', 'GDPR AI',
        'responsible AI', 'AI regulation', 'machine learning'
      ],
      mediaSources: [
        'VentureBeat', 'TechCrunch Europe', 'Sifted', 'The Information'
      ],
      journalists: [
        'Natasha Lomas (TechCrunch)', 'Mike Butcher (TechCrunch)'
      ],
      tradeShows: [
        'AI Summit London', 'European AI Alliance', 'VivaTech',
        'Web Summit', 'AI Paris'
      ],
      frequency: 'Hourly',
      languages: ['en', 'fr', 'de']
    }
  }
};

// Channel-specific configurations
export const CHANNEL_SPECIFIC_CONFIGS = {
  'targeting-blogs': {
    platforms: {
      'north-america': ['Medium', 'Substack', 'LinkedIn', 'Dev.to', 'Hacker News'],
      'europe': ['Medium', 'Substack', 'LinkedIn', 'Dev.to', 'JAXenter'],
      'asia-pacific': ['Medium', 'LinkedIn', 'Qiita', 'CSDN'],
      'global': ['Medium', 'Substack', 'LinkedIn', 'Dev.to']
    }
  },
  'social-display-ads': {
    platforms: {
      'north-america': ['LinkedIn', 'Facebook', 'Twitter', 'YouTube', 'TikTok'],
      'europe': ['LinkedIn', 'Facebook', 'Twitter', 'YouTube', 'Instagram'],
      'asia-pacific': ['LinkedIn', 'WeChat', 'Weibo', 'YouTube', 'TikTok'],
      'global': ['LinkedIn', 'Facebook', 'Twitter', 'YouTube']
    }
  },
  'trade-shows': {
    events: {
      'Enterprise SaaS': {
        'north-america': ['SaaStr Annual', 'Salesforce Dreamforce', 'Microsoft Ignite'],
        'europe': ['Web Summit', 'SaaS North', 'SAPPHIRE NOW']
      },
      'DevTools': {
        'north-america': ['KubeCon + CloudNativeCon', 'DockerCon', 'GitHub Universe'],
        'europe': ['KubeCon + CloudNativeCon Europe', 'FOSDEM', 'DevOpsDays']
      }
    }
  }
};

// Function to get pre-populated configuration
export const getPrePopulatedConfig = (vertical, geography, channelId) => {
  const verticalConfig = VERTICAL_CONFIGURATIONS[vertical];
  if (!verticalConfig || !verticalConfig[geography]) {
    return getDefaultConfig(channelId);
  }

  const config = verticalConfig[geography];
  const channelSpecific = CHANNEL_SPECIFIC_CONFIGS[channelId];
  
  return {
    competitors: config.competitors.join('\n'),
    keywords: config.keywords.join('\n'),
    frequency: config.frequency,
    priority: 'High',
    languages: config.languages,
    ...(channelSpecific && getChannelSpecificData(channelSpecific, geography, vertical))
  };
};

const getChannelSpecificData = (channelConfig, geography, vertical) => {
  const result = {};
  
  Object.keys(channelConfig).forEach(key => {
    if (channelConfig[key][geography]) {
      result[key] = channelConfig[key][geography].join('\n');
    } else if (channelConfig[key][vertical] && channelConfig[key][vertical][geography]) {
      result[key] = channelConfig[key][vertical][geography].join('\n');
    }
  });
  
  return result;
};

const getDefaultConfig = (channelId) => {
  return {
    competitors: '',
    keywords: '',
    frequency: 'Daily',
    priority: 'Medium',
    languages: ['en']
  };
};
