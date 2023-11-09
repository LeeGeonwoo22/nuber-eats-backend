import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AllowedRoles } from './role.decorator';
import { UserService } from 'src/users/users.service';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;
    // console.log('authBackend Token:', token); // Log the token to see if it's received correctly.
    if (token) {
      const decoded = this.jwtService.verify(token.toString());

      //console.log('authBackend Decoded:', decoded); // Log the decoded token. 
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        
        // AuthGuard.canActivate (/home/corepen/바탕화면/Project/nuber-eats-backend/src/auth/auth.guard.ts:30:17
        // 여기 줄 다음부터 읽혀지지않음. 파악 완료. 
        const { user } = await this.userService.findById(decoded['id']);
        //console.log('authBackend User:', user); // Log the user to see if it's found.
        if (user) {
          //console.log(gqlContext['user']);
          gqlContext['user'] = user;
          if (roles.includes('Any')) {
            return true;
          }
          return roles.includes(user.role);
        }
      }
    }
    return false;
  }
}
