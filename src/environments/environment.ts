// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  GITHUB_TOKEN: 'https://token-github.herokuapp.com/v1/token',
  clientId: 'Iv1.4cee52ecf113eb72',
  urlApiGit: 'https://api.github.com',
  urlLoginGit: 'https://github.com/login/oauth/',
  redirectUrl: 'https://localhost:4200/',
  repoBemug: 'arthurfritz/EducaMais-Front'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
