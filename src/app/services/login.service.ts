import {Injectable, Injector, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { LoginResponse } from '../models/responses/LoginResponse';
import { User } from '../models/entities/User';
import {urls} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  auth2: any;
  private url = urls.loginUrl;  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private currentUser: User;

  constructor(private http: HttpClient,
              private router: Router,
              private injector: Injector) {
  }

  private verifyToken(token: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, token, this.httpOptions);
  }

  public getCurrentUser(): User {
    if (this.currentUser == null) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user != null) {
        this.currentUser = new User();
        this.currentUser.setId(user.id);
        this.currentUser.setJwt(user.jwt);
        this.currentUser.setName(user.name);
        this.currentUser.setEmail(user.email);
        this.currentUser.setImageUrl(user.imageUrl);
      }
    }
    return this.currentUser;
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    location.reload(); // reload the page because if we simply redirect to login the login with google button won't initialize correctly
                       // if we refresh the page the authguard will kick in and redirect to login where the button will work
  }

  public getJwt(): string {
    return this.currentUser.getJwt();
  }

  public saveUserInternally(googleUser: any, jwt: string, id: number): void {
    this.currentUser = new User();
    this.currentUser.setGoogleData(googleUser);
    this.currentUser.setJwt(jwt);
    this.currentUser.setId(id);
    localStorage.setItem('currentUser', JSON.stringify(this.getCurrentUser()));

  }

  public getUserInitials(): string {
    return this.getCurrentUser().getInitials();
  }

  public login(googleUser: any): void {
    this.verifyToken(googleUser.getAuthResponse().id_token).subscribe(data => {
      this.saveUserInternally(googleUser, data.jwt, data.userId);
      const ngZone = this.injector.get(NgZone);   // redirect won't work correctly unless we do this nonsense
      ngZone.run(() => {
        this.router.navigate(['/home']);
      });
    });
  }
}
