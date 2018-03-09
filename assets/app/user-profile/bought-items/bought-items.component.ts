import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserProfileService} from "../user-profile.service";
import {BoughtItemModel} from "./bought-item.model";

@Component({
  selector: 'app-bought-items',
  templateUrl: './bought-items.component.html'
})
export class BoughtItemsComponent implements OnInit {
  items: BoughtItemModel[];

  constructor(private router: Router, private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.userProfileService.getBoughtItems(localStorage.getItem('userId'))
      .subscribe(
        (items: BoughtItemModel[]) => {
          this.items = items;
        }
      );
  }
}