import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. Import the necessary functions and your interceptor
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { authInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 2. This line tells your app to use the interceptor for all HTTP requests
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};