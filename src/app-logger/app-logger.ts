import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/config';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
    constructor(context: string, configService: ConfigService) {
        super();
        this.setLogLevels(configService.get<AppConfig>('application').logLevels);
        this.context = context;
    }
}
