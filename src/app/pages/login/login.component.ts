import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login.service';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('buttonRef', {static: true }) buttonElement: ButtonComponent;
  logoPath = environment.logoPath;
  bottomImagePath = environment.bottomImagePath;
  labelButton = environment.labelButton;

  auth2: any;
  loginIcon = environment.loginIcon;

  constructor(private loginService: LoginService) {}

  ngAfterViewInit(): void {
    this.googleSDK();
  }


  onLoggedIn(event: MouseEvent): void {
  }

  prepareLoginButton(): void {
    this.auth2.attachClickHandler(this.buttonElement.getElementRef().nativeElement, {},
      (googleUser) => {
        this.loginService.login(googleUser);
      }, (error) => {
        alert('Open another window please');
      });
  }

  // function from google
  public googleSDK(): void {
    const googleSdkLoaded = 'googleSDKLoaded';
    const gapi = 'gapi';
    const auth2 = 'auth2';
    window[googleSdkLoaded] = () => {
      window[gapi].load(auth2, () => {
        this.auth2 = window[gapi].auth2.init({
          client_id: environment.googleClientId,
          scope: environment.googleScope,
          cookiepolicy: environment.googleCookiepolicy
        });
        this.prepareLoginButton();
      });
    };

    // function from google
    /* tslint:disable */
    (function(document: Document, s: string, id: string): void {
      /* tslint:enable */
      let js;
      const fjs = document.getElementsByTagName(s)[0];
      if (document.getElementById(id)) {
        return;
      }
      js = document.createElement(s);
      js.id = id;
      js.src = environment.javaScriptSrc;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  ngOnInit(): void {
  }

}
