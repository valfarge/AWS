import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AdminController } from './controllers/admin.controller';
import { HomeController } from './controllers/home.controller';
import { AuthService } from './services/auth.service';
import { SmsService } from './services/sms.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { MatchesModule } from './matches/matches.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    MatchesModule,
  ],
  controllers: [HomeController, AuthController, AdminController],
  providers: [AuthService, SmsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}