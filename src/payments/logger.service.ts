// logger.service.ts

import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends NestLogger {
  // 커스텀 로깅 기능을 추가할 수 있습니다.
  setContext(context: string) {
    this.context = context;
  }
}
