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
import { log } from 'apex-log';

log('info', 'This is an info message');
log('warn', 'This is a warning');
log('error', 'This is an error');
log('debug', 'This is a debug message');
```

### Theming

```javascript
import apexLog from 'apex-log';

apexLog.config({ theme: 'light' }); // Switch to light theme
```

### Filtering Logs

```javascript
import apexLog from 'apex-log';

apexLog.filterLogs({ level: 'warn' }); // Only show warnings and errors
```

### Context-Based Logging

```javascript
import apexLog from 'apex-log';

const logger = apexLog.createLogger('MyComponent');

logger.info('Component initialized');
logger.error('An error occurred');
```

### Formatting Objects as JSON

```javascript
import apexLog from 'apex-log';

apexLog.config({ formatObjectsAsJson: true });

log('info', { key: 'value', anotherKey: 123 });
```

### Console Utilities

```javascript
import { group, groupEnd, time, timeEnd, log } from 'apex-log';

group('My Group');
log('info', 'Inside the group');
groupEnd();

time('My Timer');
// Some code
timeEnd('My Timer');
```

### Enabling/Disabling Logging

```javascript
import apexLog from 'apex-log';

apexLog.enableLogging(false); // Disable all logging
apexLog.enableLogging(true);  // Enable logging
```

### Vue 3 Usage

Apex Log can be used in Vue 3 applications with `<script setup>` or the Composition API.

#### Example with `<script setup>`:

```vue
<template>
  <div>
    <h1>Vue 3 Logging Example</h1>
    <button @click="logMessage">Log Message</button>
  </div>
</template>

<script setup>
import { log } from 'apex-log';

function logMessage() {
  log('info', 'This is a log message from Vue 3!');
}
</script>
```

#### Example with the Composition API:

```vue
<template>
  <div>
    <h1>Vue 3 Logging Example</h1>
    <button @click="logMessage">Log Message</button>
  </div>
</template>

<script>
import { log } from 'apex-log';

export default {
  setup() {
    const logMessage = () => {
      log('info', 'This is a log message from Vue 3!');
    };

    return { logMessage };
  },
};
</script>
```

#### Initial Configuration in `App.vue`

You can set up the initial configuration for Apex Log in your `App.vue` file:

```vue
<script setup>
import apexLog from 'apex-log';

// Set initial configuration for Apex Log
apexLog.config({
  theme: 'dark', // Default theme
  loggingEnabled: true, // Enable logging globally
  formatObjectsAsJson: false, // Do not format objects as JSON by default
});

// Optional: Set log filters
apexLog.filterLogs({
  level: 'info', // Show logs of level 'info' and above
  context: null, // No context filtering
});
</script>
```

### Auto Log Watch

The `autoLogWatch` feature allows you to automatically log changes to reactive variables in Vue 3.

#### Example with `<script setup>`:

```vue
<template>
  <div>
    <h1>Auto Log Watch Example</h1>
    <input v-model="name" placeholder="Enter your name" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { autoLogWatch } from 'apex-log';

const name = ref('');

// Automatically log changes to the `name` variable
autoLogWatch(name, 'Name Variable');

// Alternatively, you can use Vue's `watch` with manual logging
watch(name, (newValue, oldValue) => {
  console.log(`Name changed from ${oldValue} to ${newValue}`);
});
</script>
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