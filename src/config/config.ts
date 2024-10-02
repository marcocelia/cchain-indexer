import { LogLevel } from '@nestjs/common';

export interface AppConfig {
    name: string;
    port: number;
    version: string;
    docUrl: string;
    logLevels: LogLevel[];
}

export interface Config {
    application: AppConfig;
}
