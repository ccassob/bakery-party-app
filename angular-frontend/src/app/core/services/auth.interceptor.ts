import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { environment } from '@/environments/environment'
import { catchError, throwError } from 'rxjs'
import { AuthService } from './auth.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) return next(req)

  const auth = inject(AuthService)
  const token = sessionStorage.getItem('token')
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req

  return next(authReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401 && !req.url.endsWith('/api/auth/login')) {
        auth.logout()
      }
      return throwError(() => err)
    })
  )
}
