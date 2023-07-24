import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { Verification } from './entities/verification.entity';
// import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmModule.forFeature([User, Verification])],
  exports: [UserService],
})
export class UsersModule {}
