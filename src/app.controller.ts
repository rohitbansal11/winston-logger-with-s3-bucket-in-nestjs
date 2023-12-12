import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './utils/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tests')
  async simpleGetRequest() {
    try {
      this.loggerService.info('test info message');
      this.loggerService.warn('test warn message');

      this.loggerService.debug('test debug message');

      this.loggerService.warn('test warn message');

      // throw new Error('Error thorwn to test code');
      return {
        user: 'string',
        message: 'string',
      };
    } catch (error) {

      this.loggerService.error(error);

      return {
        user: error.message,
        message: 'string',
      };
    }
  }
}
