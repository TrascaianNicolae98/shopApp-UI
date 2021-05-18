// This file can be replaced during build by using the fileReplacements array.
// ng build --prod replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.

export const environment = {
  production: false,
  logoPath: 'assets/images/logo.png',
  bottomImagePath: 'assets/images/loginbottomimage.png',
  labelButton: 'Conecteaza-te cu Google',
  bigLogoPath: 'assets/images/abacLogoBig.png',
  roundBtnPath: 'assets/images/rd.png',
  pic1: 'assets/images/pic-one.png',
  pic2: 'assets/images/pic-two.png',
  pic3: 'assets/images/pic-three.png',
  buttonGoToForm: ' + ',
  buttonGoToProfile: 'PB',
  loginIcon : 'perm_identity',
  googleClientId : '784500132888-3e6622mupo88cvtfefnhfv4bmt5m24u6.apps.googleusercontent.com',
  googleScope: 'profile email',
  googleCookiepolicy: 'single_host_origin',
  javaScriptSrc : 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded',
  defaultItemsPerPage: 10
};

export const urls = {
  loginUrl :  'http://localhost:8080/api/loginWithGoogle',
  shopUrl : 'http://localhost:8080/api/shops',
  productUrl: 'http://localhost:8080/api/products'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as zone.run, zoneDelegate.invokeTask.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
