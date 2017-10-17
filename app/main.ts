import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import { BackendService } from "./shared/backend/backend.service";

import { setStatusBarColors } from "./utils/status-bar-util";

import firebase = require("nativescript-plugin-firebase");


firebase.init({
    //
    persist: false,
    onAuthStateChanged: (data: any) => {
      console.log("Session usuario: "+JSON.stringify(data))
      if (data.loggedIn) {
        BackendService.token = data.user.uid;
      }
      else {
        BackendService.token = "";
      }
    } 
    //
}).then(
    (instance) => {
        console.log("Firebase init done!");
    },
    (error) => {
        console.log("Firebase init error: "+error);
    }

);

setStatusBarColors();

platformNativeScriptDynamic().bootstrapModule(AppModule);






 


