import { Injectable, ConflictException, NotFoundException, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SmsService } from './sms.service';
import { RegisterDto, VerifyCodeDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private smsService: SmsService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ userId: string }> {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: registerDto.email },
            { username: registerDto.username },
            { phoneNumber: registerDto.phoneNumber },
          ],
        },
      });

      if (existingUser) {
        this.logger.warn(`Registration attempt with existing credentials: ${registerDto.email}`);
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await this.prisma.user.create({
        data: {
          ...registerDto,
          password: hashedPassword,
          verificationCode,
        },
      });

      try {
        await this.smsService.sendVerificationCode(user.phoneNumber, verificationCode);
      } catch (error) {
        // If SMS fails, delete the user and throw an error
        await this.prisma.user.delete({ where: { id: user.id } });
        this.logger.error(`Failed to send SMS verification: ${error.message}`);
        throw new InternalServerErrorException('Failed to send verification code');
      }

      this.logger.log(`New user registered: ${user.email}`);
      return { userId: user.id };
    } catch (error) {
      if (error instanceof ConflictException || error instanceof InternalServerErrorException) {
        throw error;
      }
      this.logger.error(`Registration error: ${error.message}`);
      throw new InternalServerErrorException('An error occurred during registration');
    }
  }

  async verifyCode(userId: string, verifyCodeDto: VerifyCodeDto): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        this.logger.warn(`Verification attempt for non-existent user ID: ${userId}`);
        throw new NotFoundException('User not found');
      }

      if (user.verificationCode !== verifyCodeDto.code) {
        this.logger.warn(`Invalid verification code attempt for user ID: ${userId}`);
        throw new BadRequestException('Invalid verification code');
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          isVerified: true,
          verificationCode: null,
        },
      });

      this.logger.log(`User verified successfully: ${user.email}`);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(`Verification error: ${error.message}`);
      throw new InternalServerErrorException('An error occurred during verification');
    }
  }
}