import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BackendService } from "../../shared/backend/backend.service";
import { User } from "./user";
import { Config } from "../config";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.GOOGLE,

    }).then((result: any) => {
      BackendService.token = result.uid;
      return JSON.stringify(result);
    }, (errorMessage: any) => {
      alert(errorMessage);
    });
  }

  register(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "Users",
      JSON.stringify({
        Username: user.email,
        Email: user.email,
        Password: user.password
      }),
      { headers: headers }
    )
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}