// Intelligence service for generating competitive analysis reports

export class IntelligenceService {
  constructor(options = {}) {
    // Use serverless proxy; prefer Vercel path if present, else Netlify
    const isLocal = typeof window !== 'undefined' && window.location && window.location.hostname.includes('localhost');
    const vercelPath = '/api/intelligence';
    const netlifyPath = '/.netlify/functions/intelligence';
    const preferVercel = typeof window !== 'undefined' && !!window.__VERCEL;
    this.proxyUrl = options.proxyUrl || (isLocal ? netlifyPath : (preferVercel ? vercelPath : netlifyPath));
    this.userApiKey = options.userApiKey || null;
  }

  async generateChannelIntelligence(channel, config, vertical, geography) {
    const prompt = this.buildAnalysisPrompt(channel, config, vertical, geography);
    
    try {
      const response = await fetch(this.proxyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: this.userApiKey || undefined,
          provider: config.provider || 'anthropic',
          model: config.model || (config.provider === 'openai' ? 'gpt-4o-mini' : 'claude-3-5-sonnet-20240620'),
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      let responseText = data.text || '';
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error generating intelligence:", error);
      return this.getFallbackIntelligence(channel);
    }
  }

  buildAnalysisPrompt(channel, config, vertical, geography) {
    const currentDate = new Date().toISOString().split('T')[0];
    
    return `You are a senior competitive intelligence analyst at a Big Tech company, reporting to C-suite executives. 

CONTEXT:
- Industry Vertical: ${vertical}
- Geography: ${geography}
- Traction Channel: ${channel.name}
- Analysis Date: ${currentDate}
- Monitoring Priority: ${config.priority}
- Languages: ${config.languages ? config.languages.join(', ') : 'English'}

TARGET COMPETITORS:
${config.competitors}

MONITORING KEYWORDS:
${config.keywords}

CHANNEL-SPECIFIC PARAMETERS:
${this.formatChannelSpecificConfig(config, channel)}

TASK: Generate a comprehensive competitive intelligence report for the ${channel.name} traction channel. Focus on actionable insights that can inform strategic decisions.

ANALYSIS REQUIREMENTS:
1. Identify 3-5 significant competitor activities in this channel from the past 24-48 hours
2. Assess threat levels based on potential market impact and competitive positioning
3. Identify strategic opportunities and market gaps
4. Provide specific, executable recommendations
5. Include confidence scores and data quality indicators

OUTPUT FORMAT (JSON only):
{
  "executiveSummary": "2-sentence summary of key findings and implications",
  "channelName": "${channel.name}",
  "analysisDate": "${currentDate}",
  "geography": "${geography}",
  "vertical": "${vertical}",
  "keyActivities": [
    {
      "competitor": "Company Name",
      "activity": "Detailed description of the activity",
      "impact": "critical|high|medium|low",
      "evidence": "Source or evidence for this activity",
      "implications": "Strategic implications for our business"
    }
  ],
  "threatAssessment": {
    "overallThreatLevel": "critical|high|medium|low",
    "primaryThreats": ["threat1", "threat2", "threat3"],
    "emergingRisks": ["risk1", "risk2"],
    "timeToImpact": "immediate|short-term|medium-term|long-term"
  },
  "marketOpportunities": [
    {
      "opportunity": "Description of the opportunity",
      "marketSize": "Estimated market size or impact",
      "difficulty": "easy|medium|hard",
      "timeframe": "Expected timeframe to capture"
    }
  ],
  "strategicRecommendations": [
    {
      "action": "Specific action to take",
      "priority": "critical|high|medium|low",
      "owner": "Suggested team/department",
      "timeline": "Recommended timeline",
      "resources": "Required resources or budget"
    }
  ],
  "dataQuality": {
    "confidenceScore": 85,
    "sourceReliability": "high|medium|low",
    "dataFreshness": "real-time|recent|stale",
    "coverageGaps": ["gap1", "gap2"]
  },
  "nextActions": [
    "Immediate follow-up action 1",
    "Immediate follow-up action 2"
  ]
}

CRITICAL REQUIREMENTS:
- Provide ONLY valid JSON response
- Use specific company names and real activities where possible
- Include quantitative metrics when available
- Focus on actionable intelligence for C-suite decision making
- Maintain high accuracy standards suitable for executive briefings`;
  }

  formatChannelSpecificConfig(config, channel) {
    const channelSpecific = [];
    
    // Add channel-specific parameters based on the channel type
    Object.keys(config).forEach(key => {
      if (!['competitors', 'keywords', 'frequency', 'priority', 'languages'].includes(key) && config[key]) {
        channelSpecific.push(`${key}: ${config[key]}`);
      }
    });
    
    return channelSpecific.length > 0 ? channelSpecific.join('\n') : 'No additional parameters specified';
  }

  getFallbackIntelligence(channel) {
    return {
      executiveSummary: "Limited intelligence available due to API constraints. Manual analysis recommended.",
      channelName: channel.name,
      analysisDate: new Date().toISOString().split('T')[0],
      geography: "Unknown",
      vertical: "Unknown",
      keyActivities: [
        {
          competitor: "Sample Competitor",
          activity: "Sample competitive activity detected",
          impact: "medium",
          evidence: "Automated monitoring system",
          implications: "Requires further investigation"
        }
      ],
      threatAssessment: {
        overallThreatLevel: "medium",
        primaryThreats: ["Limited visibility into competitor activities"],
        emergingRisks: ["Data collection gaps"],
        timeToImpact: "unknown"
      },
      marketOpportunities: [
        {
          opportunity: "Improve competitive intelligence capabilities",
          marketSize: "Internal efficiency gains",
          difficulty: "medium",
          timeframe: "3-6 months"
        }
      ],
      strategicRecommendations: [
        {
          action: "Enhance data collection mechanisms",
          priority: "high",
          owner: "Intelligence Team",
          timeline: "30 days",
          resources: "Technical resources for API integration"
        }
      ],
      dataQuality: {
        confidenceScore: 40,
        sourceReliability: "low",
        dataFreshness: "stale",
        coverageGaps: ["Real-time competitor data", "Cross-platform monitoring"]
      },
      nextActions: [
        "Review and expand data sources",
        "Implement manual monitoring procedures"
      ]
    };
  }

  async generateBatchIntelligence(channels, configs, vertical, geography) {
    const reports = [];
    
    for (const channel of channels) {
      if (configs[channel.id]) {
        try {
          const intelligence = await this.generateChannelIntelligence(
            channel, 
            configs[channel.id], 
            vertical, 
            geography
          );
          reports.push({
            id: Date.now() + Math.random(),
            timestamp: new Date().toISOString(),
            ...intelligence
          });
          
          // Add small delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error generating intelligence for ${channel.name}:`, error);
        }
      }
    }
    
    return reports;
  }
}

export default IntelligenceService;