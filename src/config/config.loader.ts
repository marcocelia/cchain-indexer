import { Config } from './config';
import { LogLevel } from '@nestjs/common';

export const ConfigLoader = (): Config => {
    return {
        application: {
            name: 'C-Chain Indexer',
            port: +(process.env.APP_PORT ?? 3000),
            version: '1.0',
            docUrl: process.env.APP_DOC_URL || '/api/',
            logLevels: process.env.APP_LOG
                ? process.env.APP_LOG.split(',').map((l) => l.trim() as LogLevel)
                : ['error', 'log'],
        },
    };
};
