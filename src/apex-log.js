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
function log(level = 'info', ...args) { // Default level to 'info'
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

// Automatically log `watch` and `watchEffect`
function autoLogWatch(watchFn, callback, options) {
  return watchFn(
    callback,
    (...args) => {
      log('info', `[WATCH]`, ...args);
      callback(...args); // Call the original callback
    },
    options
  );
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
  autoLogWatch, // Expose the autoLogWatch function
};

// Export all functions as named exports
export const config = apexLog.config;
export const enableLogging = apexLog.enableLogging;
export const filterLogs = apexLog.filterLogs;
export const createLogger = apexLog.createLogger;
export const info = apexLog.info;
export const warn = apexLog.warn;
export const error = apexLog.error;
export const debug = apexLog.debug;
export const group = apexLog.group;
export const groupEnd = apexLog.groupEnd;
export const time = apexLog.time;
export const timeEnd = apexLog.timeEnd;
export const autoLogWatch = apexLog.autoLogWatch;
export { log };

// Default export for the full API
export default apexLog;