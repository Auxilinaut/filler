/*
 Original by Craig A. Hancock
Licensed under the Apache License, Version 2.0
*/

import { Main } from "./main";

// Entry point for the app
window.onload = () => {
  // tslint:disable-next-line:no-unused-new no-unused-variable
  let app = new Main(window.appConfig || {});
};
