import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/map";

import { Config } from "../config";
import { Grocery } from "./grocery";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class GroceryListService {
  constructor(private ngZone: NgZone) {}

  maxElement: number = 5;
  groceries: BehaviorSubject<Array<Grocery>> = new BehaviorSubject([]);
  private _allGroceries: Array<Grocery> = [];

  load(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Groceries';
      //this.loader.show({ message: 'Getting recipes...' });
      console.log("##### groceries load ");
      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          let results = this.handleSnapshot(snapshot.value);
          console.log(JSON.stringify(results))
          observer.next(results);
        });
      };
      firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();
  }

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allGroceries = [];
    if (data) {
      for (let id in data) {
        let result = (<any>Object).assign({ id: id }, data[id]);
       
          this._allGroceries.push(result);
        
      }
    }
    console.log("All Groceries: "+this._allGroceries);
    return this._allGroceries;
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  add(name: string) {
    return   firebase.push(
      '/Groceries',
      {
        'name': name 
      }
  ).then(
      function (result) {
        console.log("created key: " + result.key);
      }
  );
  }

  delete(grocery: Grocery) {
    return firebase.remove("/Groceries/"+grocery.id+"")
      .catch(this.handleErrors);
  }
}