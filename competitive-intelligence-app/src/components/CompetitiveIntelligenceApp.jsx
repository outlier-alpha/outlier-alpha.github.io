import React, { useState, useEffect } from 'react';
import { Search, Settings, Download, Play, BarChart3, Globe, Building2, Zap, AlertTriangle, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { TRACTION_CHANNELS } from '../data/tractionChannels.js';
import { VERTICAL_CONFIGURATIONS, GEOGRAPHIES, getPrePopulatedConfig } from '../data/verticalConfigurations.js';
import IntelligenceService from '../services/intelligenceService.js';
import GoogleSheetsService from '../services/googleSheetsService.js';

const VERTICALS = Object.keys(VERTICAL_CONFIGURATIONS);

const CompetitiveIntelligenceApp = () => {
  const [currentStep, setCurrentStep] = useState('setup');
  const [selectedVertical, setSelectedVertical] = useState('');
  const [selectedGeography, setSelectedGeography] = useState('');
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [channelConfigs, setChannelConfigs] = useState({});
  const [reports, setReports] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('setup');

  const [userApiKey, setUserApiKey] = useState('');
  const [provider, setProvider] = useState('anthropic');
  const [model, setModel] = useState('claude-3-5-sonnet-20240620');
  const intelligenceService = new IntelligenceService({ userApiKey });
  const sheetsService = new GoogleSheetsService();

  // Auto-populate configurations when vertical/geography changes
  useEffect(() => {
    if (selectedVertical && selectedGeography) {
      const newConfigs = {};
      
      selectedChannels.forEach(channelId => {
        const prePopulated = getPrePopulatedConfig(selectedVertical, selectedGeography, channelId);
        newConfigs[channelId] = {
          ...prePopulated,
          ...channelConfigs[channelId]
        };
      });
      
      setChannelConfigs(newConfigs);
    }
  }, [selectedVertical, selectedGeography, selectedChannels]);

  const handleChannelToggle = (channelId) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const updateChannelConfig = (channelId, field, value) => {
    setChannelConfigs(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        [field]: value
      }
    }));
  };

  const generateReports = async () => {
    setIsGenerating(true);
    const channelsToProcess = selectedChannels.map(channelId => 
      TRACTION_CHANNELS.find(c => c.id === channelId)
    ).filter(Boolean);

    try {
      const newReports = await intelligenceService.generateBatchIntelligence(
        channelsToProcess, 
        channelConfigs, 
        selectedVertical, 
        selectedGeography
      );
      setReports(newReports);
      setActiveTab('reports');
    } catch (error) {
      console.error('Error generating reports:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReports = async () => {
    try {
      await sheetsService.exportReports(reports);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Competitive Intelligence Platform
              </h1>
              <p className="text-gray-600 mt-1">
                CXO-level intelligence across 19 traction channels
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('setup')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'setup' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Setup
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'reports' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'setup' && (
          <div className="space-y-8">
            {/* Step 0: API Key (optional) */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                0. Provider & API Key (optional)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                  <select
                    value={provider}
                    onChange={(e) => {
                      const p = e.target.value;
                      setProvider(p);
                      setModel(p === 'openai' ? 'gpt-4o-mini' : 'claude-3-5-sonnet-20240620');
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="anthropic">Anthropic</option>
                    <option value="openai">OpenAI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key (optional)</label>
                  <input
                    type="password"
                    value={userApiKey}
                    onChange={(e) => setUserApiKey(e.target.value)}
                    placeholder={provider === 'openai' ? 'sk-...' : 'sk-ant-...'}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Step 1: Vertical and Geography Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                1. Select Your Industry Vertical & Geography
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Vertical
                  </label>
                  <select
                    value={selectedVertical}
                    onChange={(e) => setSelectedVertical(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a vertical...</option>
                    {VERTICALS.map(vertical => (
                      <option key={vertical} value={vertical}>{vertical}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Geography
                  </label>
                  <select
                    value={selectedGeography}
                    onChange={(e) => setSelectedGeography(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select geography...</option>
                    {GEOGRAPHIES.map(geo => (
                      <option key={geo.id} value={geo.id}>{geo.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Channel Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                2. Select Traction Channels to Monitor ({selectedChannels.length}/19)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TRACTION_CHANNELS.map(channel => (
                  <div
                    key={channel.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedChannels.includes(channel.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleChannelToggle(channel.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{channel.name}</h3>
                        <p className="text-sm text-gray-500">{channel.category}</p>
                      </div>
                      {selectedChannels.includes(channel.id) && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Channel Configuration */}
            {selectedChannels.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  3. Configure Selected Channels
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Configurations are pre-populated based on your vertical and geography selection.
                </p>
                <div className="space-y-6">
                  {selectedChannels.map(channelId => {
                    const channel = TRACTION_CHANNELS.find(c => c.id === channelId);
                    const config = { provider, model, ...(channelConfigs[channelId] || {}) };
                    
                    return (
                      <div key={channelId} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-4">{channel.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Primary Competitors
                            </label>
                            <textarea
                              value={config.competitors || ''}
                              onChange={(e) => updateChannelConfig(channelId, 'competitors', e.target.value)}
                              placeholder="List competitors (one per line)"
                              className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Industry Keywords
                            </label>
                            <textarea
                              value={config.keywords || ''}
                              onChange={(e) => updateChannelConfig(channelId, 'keywords', e.target.value)}
                              placeholder="Key terms for monitoring"
                              className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Monitoring Frequency
                            </label>
                            <select
                              value={config.frequency || 'Daily'}
                              onChange={(e) => updateChannelConfig(channelId, 'frequency', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                              <option value="Hourly">Hourly</option>
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Priority Level
                            </label>
                            <select
                              value={config.priority || 'Medium'}
                              onChange={(e) => updateChannelConfig(channelId, 'priority', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                              <option value="Critical">Critical</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Generate Reports Button */}
            {selectedVertical && selectedGeography && selectedChannels.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Ready to Generate Intelligence</h3>
                  <p className="text-gray-600 mt-2">
                    {selectedChannels.length} channels configured for {selectedVertical} in{' '}
                    {GEOGRAPHIES.find(g => g.id === selectedGeography)?.name}
                  </p>
                </div>
                <button
                  onClick={generateReports}
                  disabled={isGenerating}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Intelligence...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Generate Daily Reports
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Reports Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Intelligence Reports</h2>
                  <p className="text-gray-600">
                    {reports.length} reports generated for {selectedVertical} in{' '}
                    {GEOGRAPHIES.find(g => g.id === selectedGeography)?.name}
                  </p>
                </div>
                {reports.length > 0 && (
                  <button
                    onClick={exportReports}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Export CSV
                  </button>
                )}
              </div>
            </div>

            {/* Reports List */}
            {reports.length > 0 ? (
              <div className="space-y-6">
                {reports.map(report => (
                  <div key={report.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{report.channelName}</h3>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">
                            {new Date(report.timestamp).toLocaleDateString()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getThreatColor(report.threatAssessment?.overallThreatLevel)}`}>
                            {report.threatAssessment?.overallThreatLevel?.toUpperCase()} THREAT
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{report.executiveSummary}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Confidence Score</h4>
                          <div className="text-2xl font-bold text-blue-600">
                            {report.dataQuality?.confidenceScore}%
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Key Activities</h4>
                          <div className="text-2xl font-bold text-orange-600">
                            {report.keyActivities?.length || 0}
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Opportunities</h4>
                          <div className="text-2xl font-bold text-green-600">
                            {report.marketOpportunities?.length || 0}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Key Activities
                          </h4>
                          <div className="space-y-3">
                            {report.keyActivities?.map((activity, idx) => (
                              <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium">{activity.competitor}</span>
                                  <span className={`px-2 py-1 text-xs rounded-full ${getThreatColor(activity.impact)}`}>
                                    {activity.impact?.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{activity.activity}</p>
                                <p className="text-xs text-gray-500">Source: {activity.evidence}</p>
                              </div>
                            )) || <p className="text-gray-500">No activities detected</p>}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Strategic Recommendations
                          </h4>
                          <div className="space-y-3">
                            {report.strategicRecommendations?.map((rec, idx) => (
                              <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getThreatColor(rec.priority)}`}>
                                    {rec.priority?.toUpperCase()} PRIORITY
                                  </span>
                                  <span className="text-sm text-gray-500">{rec.timeline}</span>
                                </div>
                                <p className="text-sm font-medium mb-1">{rec.action}</p>
                                <p className="text-xs text-gray-600">
                                  Owner: {rec.owner} | Resources: {rec.resources}
                                </p>
                              </div>
                            )) || <p className="text-gray-500">No recommendations available</p>}
                          </div>
                        </div>
                      </div>

                      {/* Market Opportunities */}
                      {report.marketOpportunities && report.marketOpportunities.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            Market Opportunities
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {report.marketOpportunities.map((opp, idx) => (
                              <div key={idx} className="p-3 border border-green-200 bg-green-50 rounded-lg">
                                <h5 className="font-medium text-green-900">{opp.opportunity}</h5>
                                <p className="text-sm text-green-700 mt-1">
                                  Size: {opp.marketSize} | Difficulty: {opp.difficulty} | Timeline: {opp.timeframe}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Next Actions */}
                      {report.nextActions && report.nextActions.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-900 mb-3">Next Actions</h4>
                          <ul className="space-y-2">
                            {report.nextActions.map((action, idx) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Generated</h3>
                <p className="text-gray-600 mb-4">
                  Configure your channels and generate intelligence reports to see insights here.
                </p>
                <button
                  onClick={() => setActiveTab('setup')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Go to Setup
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitiveIntelligenceApp;
