import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as moment from 'moment';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: 'aws-access-key',
      secretAccessKey: 'aws-secret-access-key',
      region: 'aws-reagion',
    });

    this.s3 = new AWS.S3();
  }

  async writeToS3(data: object): Promise<void> {
    const bucketName = 'mytmptestbucket123';
    const productName = 'myProduct';

    const key = `alllogs/${moment(new Date()).format(
      'YYYY-MMMM',
    )}-${productName}_logfile.json`;

    try {
      const headParams: AWS.S3.Types.GetObjectRequest = {
        Bucket: bucketName,
        Key: key,
      };

      let existingLogs: object[] = [];
      try {
        const { Body } = await this.s3.getObject(headParams).promise();
        existingLogs = JSON.parse(Body?.toString('utf-8') || '[]');
      } catch (err) {
        if (err.code !== 'NoSuchKey') {
          throw err;
        }
      }

      existingLogs.push(data);

      await this.s3
        .putObject({
          Bucket: bucketName,
          Key: key,
          Body: JSON.stringify(existingLogs, null, 2),
          ContentType: 'application/json',
        })
        .promise();
    } catch (error) {
      console.error('Error appending logs to S3:', error);
      throw error;
    }
  }
}
