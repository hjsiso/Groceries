import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import { setStatusBarColors } from "./utils/status-bar-util";

import firebase = require("nativescript-plugin-firebase");


setStatusBarColors();

platformNativeScriptDynamic().bootstrapModule(AppModule);

