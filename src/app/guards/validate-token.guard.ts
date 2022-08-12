import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
  private router: Router
  ) { }
  
  canActivate(): Observable<boolean> | boolean {
    return this.authService.validateToken()
      .pipe(
        tap(valid => {
          !valid ? this.router.navigateByUrl('/auth') : null
        })
      )    
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.validateToken()
      .pipe(tap(valid => {
        !valid ? this.router.navigateByUrl('/auth') : null;
      }))
  }
}