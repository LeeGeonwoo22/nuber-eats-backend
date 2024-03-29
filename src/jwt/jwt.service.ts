import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { JwtModuleOptions } from './jwt.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  sign(userId: number): string {
    
    console.log('jwt id :',userId);
    // console.log(`.env.privateKey :`, this.options.privateKey);
    return jwt.sign({ id: userId }, this.options.privateKey);
  }
  
  verify(token: string) {
    // console.log('verify :', token)
    return jwt.verify(token, this.options.privateKey);
    
  }

  
}
