// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SocketIoConfig } from 'ngx-socket-io';
/* Socket IO Config */
const socketIOConfig: SocketIoConfig = { url: "https://dominicanbustracker.herokuapp.com", options: {origins: 'allowedOrigins'} };
/* Socket IO Config */

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC5hg8L2_V5fhXwffRscnBRMB_DnA7AK6c',
    authDomain: 'bus-tracking-f456c.firebaseapp.com',
    databaseURL: 'https://bus-tracking-f456c.firebaseio.com',
    projectId: 'bus-tracking-f456c',
    storageBucket: 'bus-tracking-f456c.appspot.com',
    messagingSenderId: '924155774810'
  },
  socketIO: socketIOConfig,
  googleApiKey:'AIzaSyDcmHvB8H06BFKCoyYypWgkwYFN6A_YBsc',
  server_url: "https://dominicanbustracker.herokuapp.com"/* "http://localhost:3000" */
  /* googleApiKey:'AIzaSyAMlYbiejd5AybZatCXnzA9vR5UCOSSEPQ' */
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
