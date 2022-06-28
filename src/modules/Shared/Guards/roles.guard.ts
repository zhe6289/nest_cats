import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return false;
    }

    const user = { "account": "Eugene", "roles": ["admin"] }
    console.log(`User Roles: ${user.roles}`, `Api Roles: ${roles}`)
    const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));
    return user && user.roles && hasRole();
  }
}