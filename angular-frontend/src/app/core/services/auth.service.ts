import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from '@/environments/environment'
import { catchError, map, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string; email: string }>(`${environment.apiUrl}/api/auth/login`, { email, password }).pipe(
      map((res) => {
        sessionStorage.setItem('token', res.token)
        return true
      }),
      catchError(() => of(false))
    )
  }

  logout() {
    sessionStorage.removeItem('token')
    this.router.navigate(['/auth/sign-in'])
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token')
  }
}
