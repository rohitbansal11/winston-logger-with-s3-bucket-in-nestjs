import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './utils/logger.service';
import { S3Service } from './utils/s3.service';
import * as moment from 'moment';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    S3Service,
    {
      provide: 'MomentWrapper',
      useValue: moment,
    },
  ],
})
export class AppModule {}
