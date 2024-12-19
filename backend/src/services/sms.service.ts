import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

@Injectable()
export class SmsService implements OnModuleInit {
  private snsClient: SNSClient;
  private readonly logger = new Logger(SmsService.name);

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    const region = this.configService.get<string>('AWS_REGION');

    if (!accessKeyId || !secretAccessKey || !region) {
      this.logger.error('AWS credentials missing. Check your environment variables.');
      throw new Error('AWS credentials are not properly configured');
    }

    try {
      this.snsClient = new SNSClient({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log('AWS SNS client initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize AWS SNS client:', error);
      throw error;
    }
  }

  async sendVerificationCode(phoneNumber: string, code: string): Promise<void> {
    if (!this.snsClient) {
      throw new Error('AWS SNS client not initialized');
    }

    const message = `Your verification code is: ${code}`;
    
    try {
      const command = new PublishCommand({
        Message: message,
        PhoneNumber: phoneNumber,
        MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: 'VERIFY',
          },
          'AWS.SNS.SMS.SMSType': {
            DataType: 'String',
            StringValue: 'Transactional',
          },
        },
      });

      await this.snsClient.send(command);
      this.logger.log(`Verification SMS sent to ${phoneNumber}`);
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${phoneNumber}:`, error);
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }
}