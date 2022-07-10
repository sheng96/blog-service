import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap((value) => {
        const request = context.switchToHttp().getRequest<Request>();
          console.log(now)
        this.loggerService.create({
            method: request.method,
            url: request.url,
            ip: request.header('x-forwarded-for') || '',
            body: JSON.stringify(request.body),
            params: JSON.stringify(request.params),
            query: JSON.stringify(request.query),
            response: value,
            elapsedTime: Date.now() - now,
        })

      }),
    );
  }
}
