import BoltLogger from '306-boltlogger';
import process from 'process';

export let logger: BoltLogger | undefined;

function log(): BoltLogger {
  if (!logger) {
    logger = BoltLogger.createLogger();
  }
  return logger;
}

export const numericEnv = (defaultValue: number) => {
  return (target: any, key: string) => {
    const val = process.env[key] ?? '';

    let parsedVal = parseInt(val, 0);
    if (isNaN(parsedVal)) {
      parsedVal = defaultValue;
    }

    Object.defineProperty(target, key, {
      value: parsedVal,
      writable: false,
      enumerable: true,
      configurable: true,
    });
  };
};

export const stringEnv = (defaultValue: string) => {
  return (target: any, key: string) => {
    const val = process.env[key] ?? defaultValue;

    Object.defineProperty(target, key, {
      value: val,
      writable: false,
      enumerable: true,
      configurable: true,
    });
  };
};

export const arrayEnv = (defaultValue: any[]) => {
  return (target: any, key: string) => {
    let finalVal = null;
    const val = process.env[key];
    if (val) {
      try {
        finalVal = JSON.parse(val);
      } catch (err) {
        finalVal = defaultValue;
      }
    } else {
      finalVal = defaultValue;
    }

    Object.defineProperty(target, key, {
      value: finalVal,
      writable: false,
      enumerable: true,
      configurable: true,
    });
  };
};
