# Apex Log

Apex Log is a lightweight logging utility for JavaScript applications that extends the functionality of `console.log`. It provides enhanced features like theming, log filtering, and context-based logging.

## Features

- **Theming**: Choose between `dark` and `light` themes based on Apple Design System colors.
- **Log Levels**: Supports `info`, `warn`, `error`, and `debug` levels.
- **Global Configuration**: Enable or disable logging globally.
- **Filters**: Filter logs by level or context.
- **Context-Based Logging**: Create loggers with specific contexts.
- **Object Formatting**: Option to format objects as JSON strings.
- **Console Utilities**: Group logs, measure execution time, and more.

## Installation

```bash
npm install apex-log
```

## Usage

### Basic Logging

```javascript
import apexLog from 'apex-log';

apexLog.info('This is an info message');
apexLog.warn('This is a warning');
apexLog.error('This is an error');
apexLog.debug('This is a debug message');
```

### Theming

```javascript
apexLog.config({ theme: 'light' }); // Switch to light theme
```

### Filtering Logs

```javascript
apexLog.filterLogs({ level: 'warn' }); // Only show warnings and errors
```

### Context-Based Logging

```javascript
const logger = apexLog.createLogger('MyComponent');

logger.info('Component initialized');
logger.error('An error occurred');
```

### Formatting Objects as JSON

```javascript
apexLog.config({ formatObjectsAsJson: true });

apexLog.info({ key: 'value', anotherKey: 123 });
```

### Console Utilities

```javascript
apexLog.group('My Group');
apexLog.info('Inside the group');
apexLog.groupEnd();

apexLog.time('My Timer');
// Some code
apexLog.timeEnd('My Timer');
```

### Enabling/Disabling Logging

```javascript
apexLog.enableLogging(false); // Disable all logging
apexLog.enableLogging(true);  // Enable logging
```

## Configuration Options

| Option                | Type      | Default   | Description                                   |
|-----------------------|-----------|-----------|-----------------------------------------------|
| `theme`               | `string`  | `'dark'`  | Theme for log styling (`'dark'` or `'light'`) |
| `logLevels`           | `array`   | `['info', 'warn', 'error', 'debug']` | Supported log levels |
| `loggingEnabled`      | `boolean` | `true`    | Global toggle for logging                    |
| `formatObjectsAsJson` | `boolean` | `false`   | Format objects as JSON strings               |
| `filters.level`       | `string`  | `null`    | Filter logs by level                         |
| `filters.context`     | `string`  | `null`    | Filter logs by context                       |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.