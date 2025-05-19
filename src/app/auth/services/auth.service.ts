import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../Interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User

  constructor(private httpClient: HttpClient) { }

  get currentUser(): User|undefined {
    if( !this.user ) return undefined;

    return structuredClone( this.user );
  }


  login(email : string, password : string): Observable<User> {
    // this.httpClient.post('login', {email, password});
    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
      tap( user => this.user = user),
      tap( user => localStorage.setItem('token', 'kljn3l4.kn23k4.n2k3')),
    );
  }

  checkAuthentication(): Observable<boolean> {

    if( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token')


    return this.httpClient.get<User>(`&{ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError(err => of(false) )
      )

  }


  logout(){
    this.user = undefined;

    localStorage.clear();
  }

}
