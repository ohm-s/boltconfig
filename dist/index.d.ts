import BoltLogger from '306-boltlogger';
export declare let logger: BoltLogger | undefined;
export declare const numericEnv: (defaultValue: number) => (target: any, key: string) => void;
export declare const stringEnv: (defaultValue: string) => (target: any, key: string) => void;
export declare const arrayEnv: (defaultValue: any[]) => (target: any, key: string) => void;
