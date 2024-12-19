import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly ADMIN_TOKEN = '99';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const adminToken = request.query.admin as string;

    if (adminToken !== this.ADMIN_TOKEN) {
      throw new UnauthorizedException('Access denied');
    }

    return true;
  }
}
