import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{

  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) {  }

  private checkoutStatus(): boolean | Observable<boolean>{

    return this.AuthService.checkAuthentication()
    .pipe(
        tap(isAuthenticated =>{console.log('Authenticated: ', isAuthenticated)}),
        tap( isAuthenticated => {
          if( !isAuthenticated ) {
            this.router.navigate(['./auth/login'])
          }
        }),
      )

  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {

    console.log('Can Match')
    console.log({route, segments})

    return this.checkoutStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    console.log('Can Activate')
    console.log({route, state})

    return this.checkoutStatus();
  }



}
