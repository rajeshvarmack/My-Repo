import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enable zoneless change detection
    provideZonelessChangeDetection(),

    // Routing configuration
    provideRouter(routes, withHashLocation()),

    // HTTP client with interceptors
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),

    // Add other enterprise providers here
  ],
};
