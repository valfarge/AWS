import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  getHello() {
    return {
      message: 'Welcome to the Authentication API',
      version: '1.0.0',
      endpoints: {
        auth: {
          register: 'POST /auth/register',
          verify: 'POST /auth/verify/:userId',
        },
        admin: {
          users: 'GET /admin/users',
        },
      },
    };
  }
}