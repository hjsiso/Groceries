import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import { setStatusBarColors } from "./utils/status-bar-util";

import firebase = require("nativescript-plugin-firebase");


setStatusBarColors();

platformNativeScriptDynamic().bootstrapModule(AppModule);


firebase.init({
    //
    //
}).then(
    (instance) => {
        console.log("Firebase init done!");
    },
    (error) => {
        console.log("Firebase init error: "+error);
    }

);


