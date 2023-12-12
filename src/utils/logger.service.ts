import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { S3Service } from './s3.service';
import * as moment from 'moment';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;
  private readonly s3Service: S3Service;

  constructor(s3Service: S3Service) {
    this.s3Service = s3Service;

    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });

    this.logger.on('data', async (chunk) => {
      const messageCreate = { ...chunk, dateTime: moment(new Date()).format() };
      await this.s3Service.writeToS3(messageCreate);
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
  
  debug(message: string): void {
    this.logger.debug(message);
  }
 
  error(error: Error): void {
    console.log(error.toString())
    this.logger.error(error.toString());
  }
}
