import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserProfileService} from "../user-profile.service";
import {OrderModel} from "./order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orderItems: OrderModel[];

  constructor(private router: Router, private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.userProfileService.getOrders(localStorage.getItem('userId'))
      .subscribe(
        (items: OrderModel[]) => {
          this.orderItems = items;
        }
      );
  }
}