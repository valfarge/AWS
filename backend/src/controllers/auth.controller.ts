import { Controller, Post, Body, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto, VerifyCodeDto } from '../dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log(`Registration attempt for user: ${registerDto.email}`);
    return this.authService.register(registerDto);
  }

  @Post('verify/:userId')
  @ApiOperation({ summary: 'Verify phone number with code' })
  @ApiResponse({ status: 200, description: 'Phone number verified successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid verification code' })
  async verifyCode(
    @Param('userId') userId: string,
    @Body() verifyCodeDto: VerifyCodeDto,
  ) {
    this.logger.log(`Verification attempt for user ID: ${userId}`);
    await this.authService.verifyCode(userId, verifyCodeDto);
    return { message: 'Phone number verified successfully' };
  }
}