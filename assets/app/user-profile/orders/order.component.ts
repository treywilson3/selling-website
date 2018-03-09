import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from "./order.model";
import {CartItemModel} from "../cart-items/cart-item.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  items: any[];
  @Input() orderItem: OrderModel;

  constructor() {
  }

  ngOnInit() {
    this.items = this.orderItem.items;
  }
}