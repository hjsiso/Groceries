import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TextField } from "ui/text-field";
import { Observable } from "rxjs/Observable";
import { Grocery} from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import * as SocialShare from "nativescript-social-share";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "list",
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  providers: [GroceryListService]
})
export class ListComponent implements OnInit {
  public groceries$: Observable<any>;
  private sub: any;
  groceryList: Array<Grocery> = [];
  grocery = "";
  isLoading = true;
  listLoaded = false;
  @ViewChild("groceryTextField") groceryTextField: ElementRef;

  constructor(private groceryListService: GroceryListService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    
    this.groceries$ = <any>this.groceryListService.load();
    this.isLoading = false;
    this.listLoaded = true;
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }
  
    // Dismiss the keyboard
    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();
  
    this.groceryListService.add(this.grocery)
    .then(() => {
      this.grocery = "";
    })
    .catch((message: any) => {
      alert({
        message: "An error occurred while adding an item to your list.",
        okButtonText: "OK"
      });
      this.grocery = "";
    });
  }

  delete(grocery: Grocery) {

    this.groceryListService.delete(grocery)
    .catch(() => {
      alert("An error occurred while deleting an item from your list.");
    });
  }

  share() {
    let listString = this.groceryList
      .map(grocery => grocery.name)
      .join(", ")
      .trim();
    SocialShare.shareText(listString);
  }
}