import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserProfileService} from "../user-profile.service";
import {SellingItemModel} from "./selling-item.model";

@Component({
  selector: 'app-selling-items',
  templateUrl: './selling-items.component.html'
})
export class SellingItemsComponent implements OnInit {
  items: SellingItemModel[];

  constructor(private router: Router, private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.userProfileService.getSellingItems(localStorage.getItem('userId'))
      .subscribe(
        (items: SellingItemModel[]) => {
          this.items = items;
        }
      );
  }
}