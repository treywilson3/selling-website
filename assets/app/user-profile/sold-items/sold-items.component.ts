import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserProfileService} from "../user-profile.service";
import {SoldItemModel} from "./sold-item.model";

@Component({
  selector: 'app-sold-items',
  templateUrl: './sold-items.component.html'
})
export class SoldItemsComponent implements OnInit {
  items: SoldItemModel[];

  constructor(private router: Router, private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.userProfileService.getSoldItems(localStorage.getItem('userId'))
      .subscribe(
        (items: SoldItemModel[]) => {
          this.items = items;
        }
      );
  }
}