// Helper utility functions for the competitive intelligence app

// Format currency values
export const formatCurrency = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  }
  return `$${value}`;
};

// Format date ranges
export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options = { month: 'short', day: 'numeric' };
  
  if (start.getFullYear() === end.getFullYear()) {
    if (start.getMonth() === end.getMonth()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric' })}, ${end.getFullYear()}`;
    } else {
      return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${end.getFullYear()}`;
    }
  } else {
    return `${start.toLocaleDateString('en-US', { ...options, year: 'numeric' })} - ${end.toLocaleDateString('en-US', { ...options, year: 'numeric' })}`;
  }
};

// Get threat level color classes
export const getThreatLevelColor = (level) => {
  const colors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
    unknown: 'bg-gray-100 text-gray-800'
  };
  
  return colors[level?.toLowerCase()] || colors.unknown;
};

// Get priority level color classes
export const getPriorityColor = (priority) => {
  const colors = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  
  return colors[priority?.toLowerCase()] || colors.medium;
};

// Validate email addresses
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate unique IDs
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Deep clone objects
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Calculate confidence score color
export const getConfidenceColor = (score) => {
  if (score >= 85) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-600';
};

// Format large numbers
export const formatNumber = (num) => {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`;
  }
  return num.toString();
};

// Sort array by multiple criteria
export const multiSort = (array, sortBy) => {
  return [...array].sort((a, b) => {
    for (let { key, direction = 'asc' } of sortBy) {
      let aVal = a[key];
      let bVal = b[key];
      
      // Handle nested properties
      if (key.includes('.')) {
        aVal = key.split('.').reduce((obj, prop) => obj?.[prop], a);
        bVal = key.split('.').reduce((obj, prop) => obj?.[prop], b);
      }
      
      // Handle different data types
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
};

// Filter objects by search term
export const searchFilter = (items, searchTerm, searchFields) => {
  if (!searchTerm) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item => {
    return searchFields.some(field => {
      let fieldValue = item[field];
      
      // Handle nested properties
      if (field.includes('.')) {
        fieldValue = field.split('.').reduce((obj, prop) => obj?.[prop], item);
      }
      
      // Handle arrays
      if (Array.isArray(fieldValue)) {
        return fieldValue.some(val => 
          val?.toString().toLowerCase().includes(lowerSearchTerm)
        );
      }
      
      return fieldValue?.toString().toLowerCase().includes(lowerSearchTerm);
    });
  });
};

// Group array by property
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    let groupKey = item[key];
    
    // Handle nested properties
    if (key.includes('.')) {
      groupKey = key.split('.').reduce((obj, prop) => obj?.[prop], item);
    }
    
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    
    return groups;
  }, {});
};

// Calculate percentage change
export const calculatePercentageChange = (newValue, oldValue) => {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Convert camelCase to title case
export const camelToTitle = (str) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

// Validate required fields
export const validateRequired = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    let value = data[field];
    
    // Handle nested properties
    if (field.includes('.')) {
      value = field.split('.').reduce((obj, prop) => obj?.[prop], data);
    }
    
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[field] = `${camelToTitle(field)} is required`;
    }
  });
  
  return errors;
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
      return false;
    }
  }
};

// Export CSV functionality
export const exportToCsv = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header] || '';
        // Escape commas and quotes
        if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
          cell = `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// Generate report summary statistics
export const generateSummaryStats = (reports) => {
  if (!reports || reports.length === 0) {
    return {
      totalReports: 0,
      averageConfidence: 0,
      threatDistribution: {},
      channelDistribution: {},
      totalActivities: 0,
      totalOpportunities: 0,
      totalRecommendations: 0
    };
  }
  
  const threatDistribution = {};
  const channelDistribution = {};
  let totalConfidence = 0;
  let totalActivities = 0;
  let totalOpportunities = 0;
  let totalRecommendations = 0;
  
  reports.forEach(report => {
    // Threat distribution
    const threatLevel = report.threatAssessment?.overallThreatLevel || 'unknown';
    threatDistribution[threatLevel] = (threatDistribution[threatLevel] || 0) + 1;
    
    // Channel distribution
    const channel = report.channelName || 'unknown';
    channelDistribution[channel] = (channelDistribution[channel] || 0) + 1;
    
    // Confidence
    totalConfidence += report.dataQuality?.confidenceScore || 0;
    
    // Activities, opportunities, recommendations
    totalActivities += report.keyActivities?.length || 0;
    totalOpportunities += report.marketOpportunities?.length || 0;
    totalRecommendations += report.strategicRecommendations?.length || 0;
  });
  
  return {
    totalReports: reports.length,
    averageConfidence: Math.round(totalConfidence / reports.length),
    threatDistribution,
    channelDistribution,
    totalActivities,
    totalOpportunities,
    totalRecommendations
  };
};
