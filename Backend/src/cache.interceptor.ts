import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Simple in-memory cache with TTL (5 minutes)
const cache = new Map<string, { data: any; expiry: number }>();

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle();
    }

    const key = `${req.method}:${req.url}`;
    const cached = cache.get(key);

    if (cached && cached.expiry > Date.now()) {
      return new Observable((subscriber) => {
        subscriber.next(cached.data);
        subscriber.complete();
      });
    }

    return next.handle().pipe(
      tap((data) => {
        // Cache for 5 minutes
        cache.set(key, {
          data,
          expiry: Date.now() + 5 * 60 * 1000,
        });
      }),
    );
  }
}
