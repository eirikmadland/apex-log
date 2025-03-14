// Default configuration
const defaultConfig = {
  theme: 'dark', // 'dark' or 'light'
  logLevels: ['info', 'warn', 'error', 'debug'], // Supported log levels
  loggingEnabled: true, // Global toggle for logging
  formatObjectsAsJson: false, // Format objects as JSON strings
  filters: {
    level: null, // Filter logs by level (e.g., 'warn', 'error')
    context: null, // Filter logs by context
  },
};

// Themes based on Apple Design System colors
const themes = {
  dark: {
    info: 'color: #64D2FF;', // Light blue
    warn: 'color: #FFD60A;', // Yellow
    error: 'color: #FF375F;', // Red
    debug: 'color: #5E5CE6;', // Purple
  },
  light: {
    info: 'color: #007AFF;', // Blue
    warn: 'color: #FF9500;', // Orange
    error: 'color: #FF3B30;', // Red
    debug: 'color: #5856D6;', // Purple
  },
};

// Global configuration
let globalConfig = { ...defaultConfig };

// Utility to get theme styles
const getStyle = (level) => themes[globalConfig.theme][level] || '';

// Utility to get file and line number
const getCallerInfo = () => {
  const stack = new Error().stack;
  const callerLine = stack.split('\n')[3]; // Adjust index based on stack trace format
  const match = callerLine.match(/\/([^/]+):(\d+):\d+/);
  return match ? `${match[1]}:${match[2]}` : 'unknown';
};

// Core logging function
function log(level, ...args) {
  if (!globalConfig.loggingEnabled) return; // Respect global toggle
  if (globalConfig.filters.level && globalConfig.filters.level !== level) return; // Filter by level

  const timestamp = new Date().toISOString();
  const prefix = `[${level.toUpperCase()}]`;
  const callerInfo = getCallerInfo();

  // Format objects as JSON if enabled
  const formattedArgs = globalConfig.formatObjectsAsJson
    ? args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg))
    : args;

  console.log(`%c${timestamp} ${prefix} (${callerInfo})`, getStyle(level), ...formattedArgs);
}

// Public API
const apexLog = {
  config: (newConfig) => {
    globalConfig = { ...globalConfig, ...newConfig };
  },
  enableLogging: (enabled) => {
    globalConfig.loggingEnabled = enabled;
  },
  filterLogs: (filters) => {
    globalConfig.filters = { ...globalConfig.filters, ...filters };
  },
  createLogger: (context) => {
    return {
      info: (...args) => {
        if (!globalConfig.filters.context || globalConfig.filters.context === context) {
          log('info', `[${context}]`, ...args);
        }
      },
      warn: (...args) => {
        if (!globalConfig.filters.context || globalConfig.filters.context === context) {
          log('warn', `[${context}]`, ...args);
        }
      },
      error: (...args) => {
        if (!globalConfig.filters.context || globalConfig.filters.context === context) {
          log('error', `[${context}]`, ...args);
        }
      },
      debug: (...args) => {
        if (!globalConfig.filters.context || globalConfig.filters.context === context) {
          log('debug', `[${context}]`, ...args);
        }
      },
    };
  },
  info: (...args) => log('info', ...args),
  warn: (...args) => log('warn', ...args),
  error: (...args) => log('error', ...args),
  debug: (...args) => log('debug', ...args),
  group: (name) => console.group(name),
  groupEnd: () => console.groupEnd(),
  time: (label) => console.time(label),
  timeEnd: (label) => console.timeEnd(label),
};

// Export all functions as named exports
export const config = apexLog.config;
export const enableLogging = apexLog.enableLogging;
export const filterLogs = apexLog.filterLogs;
export const createLogger = apexLog.createLogger; // Now a method inside apexLog
export const info = apexLog.info;
export const warn = apexLog.warn;
export const error = apexLog.error;
export const debug = apexLog.debug;
export const group = apexLog.group;
export const groupEnd = apexLog.groupEnd;
export const time = apexLog.time;
export const timeEnd = apexLog.timeEnd;
export { log };

// Default export for the full API
export default apexLog;