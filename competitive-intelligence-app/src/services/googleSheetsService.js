// Google Sheets integration service

export class GoogleSheetsService {
  constructor() {
    this.sheetId = null;
    this.accessToken = null;
  }

  // Initialize Google Sheets API (in real implementation, use OAuth)
  async initialize(sheetId, accessToken) {
    this.sheetId = sheetId;
    this.accessToken = accessToken;
  }

  // Export reports to Google Sheets
  async exportReports(reports, sheetName = 'Competitive Intelligence') {
    if (!this.sheetId || !this.accessToken) {
      // Fallback to CSV download
      return this.exportToCSV(reports);
    }

    try {
      const spreadsheetData = this.formatReportsForSheets(reports);
      
      // In a real implementation, this would use Google Sheets API
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${sheetName}!A1:append`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: spreadsheetData,
          majorDimension: 'ROWS'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to export to Google Sheets');
      }

      return { success: true, message: 'Reports exported to Google Sheets successfully' };
    } catch (error) {
      console.error('Google Sheets export failed:', error);
      return this.exportToCSV(reports);
    }
  }

  formatReportsForSheets(reports) {
    const headers = [
      'Timestamp',
      'Channel',
      'Geography',
      'Vertical',
      'Executive Summary',
      'Threat Level',
      'Key Activities',
      'Primary Threats',
      'Market Opportunities',
      'Strategic Recommendations',
      'Confidence Score',
      'Data Quality',
      'Next Actions'
    ];

    const rows = reports.map(report => [
      new Date(report.timestamp).toLocaleString(),
      report.channelName,
      report.geography,
      report.vertical,
      report.executiveSummary,
      report.threatAssessment?.overallThreatLevel || 'Unknown',
      this.formatActivities(report.keyActivities),
      report.threatAssessment?.primaryThreats?.join('; ') || '',
      this.formatOpportunities(report.marketOpportunities),
      this.formatRecommendations(report.strategicRecommendations),
      report.dataQuality?.confidenceScore || 0,
      report.dataQuality?.sourceReliability || 'Unknown',
      report.nextActions?.join('; ') || ''
    ]);

    return [headers, ...rows];
  }

  formatActivities(activities) {
    if (!activities || activities.length === 0) return '';
    
    return activities.map(activity => 
      `${activity.competitor}: ${activity.activity} (${activity.impact})`
    ).join(' | ');
  }

  formatOpportunities(opportunities) {
    if (!opportunities || opportunities.length === 0) return '';
    
    return opportunities.map(opp => 
      `${opp.opportunity} (${opp.difficulty}, ${opp.timeframe})`
    ).join(' | ');
  }

  formatRecommendations(recommendations) {
    if (!recommendations || recommendations.length === 0) return '';
    
    return recommendations.map(rec => 
      `${rec.action} (${rec.priority}, ${rec.timeline})`
    ).join(' | ');
  }

  exportToCSV(reports) {
    const csvContent = this.formatReportsForSheets(reports)
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `competitive-intelligence-${Date.now()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return { success: true, message: 'Reports exported as CSV file' };
  }

  // Create formatted executive dashboard sheet
  async createExecutiveDashboard(reports) {
    const dashboard = this.generateExecutiveDashboard(reports);
    return this.exportToCSV([dashboard]);
  }

  generateExecutiveDashboard(reports) {
    const threatLevels = reports.reduce((acc, report) => {
      const level = report.threatAssessment?.overallThreatLevel || 'unknown';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    const channelActivity = reports.reduce((acc, report) => {
      acc[report.channelName] = (acc[report.channelName] || 0) + 1;
      return acc;
    }, {});

    const avgConfidence = reports.length > 0 
      ? Math.round(reports.reduce((sum, report) => 
          sum + (report.dataQuality?.confidenceScore || 0), 0) / reports.length)
      : 0;

    return {
      summary: 'Executive Dashboard',
      totalReports: reports.length,
      criticalThreats: threatLevels.critical || 0,
      highThreats: threatLevels.high || 0,
      mostActiveChannel: Object.keys(channelActivity).reduce((a, b) => 
        channelActivity[a] > channelActivity[b] ? a : b, ''),
      averageConfidence: avgConfidence,
      lastUpdated: new Date().toISOString()
    };
  }
}

export default GoogleSheetsService;