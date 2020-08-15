"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayEnv = exports.stringEnv = exports.numericEnv = exports.logger = void 0;
var _306_boltlogger_1 = __importDefault(require("306-boltlogger"));
var process_1 = __importDefault(require("process"));
function log() {
    if (!exports.logger) {
        exports.logger = _306_boltlogger_1.default.createLogger();
    }
    return exports.logger;
}
exports.numericEnv = function (defaultValue) {
    return function (target, key) {
        var _a;
        var val = (_a = process_1.default.env[key]) !== null && _a !== void 0 ? _a : '';
        var parsedVal = parseInt(val, 0);
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
exports.stringEnv = function (defaultValue) {
    return function (target, key) {
        var _a;
        var val = (_a = process_1.default.env[key]) !== null && _a !== void 0 ? _a : defaultValue;
        Object.defineProperty(target, key, {
            value: val,
            writable: false,
            enumerable: true,
            configurable: true,
        });
    };
};
exports.arrayEnv = function (defaultValue) {
    return function (target, key) {
        var finalVal = null;
        var val = process_1.default.env[key];
        if (val) {
            try {
                finalVal = JSON.parse(val);
            }
            catch (err) {
                finalVal = defaultValue;
            }
        }
        else {
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
