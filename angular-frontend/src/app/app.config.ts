import { DecimalPipe } from '@angular/common'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { provideTranslateService } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'
import { provideDaterangepickerLocale } from 'ngx-daterangepicker-bootstrap'
import { authInterceptor } from '@core/services/auth.interceptor'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    DecimalPipe,
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    ...provideTranslateService({ lang: 'es' }),
    ...provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
    provideDaterangepickerLocale({
      separator: ' - ',
      cancelLabel: 'Cancel',
    }),
  ],
}
