import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UserProfileService} from "../user-profile.service";
import {CartItemModel} from "./cart-item.model";
import {OrderModel} from "../orders/order.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  items: CartItemModel[];
  userForm: FormGroup;
  display: any = 'none';
  isOpen: boolean;

  constructor(private router: Router, private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.userProfileService.getCartItems(localStorage.getItem('userId'))
      .subscribe(
        (items: CartItemModel[]) => {
          this.items = items;
        }
      );
  }

  checkout() {
    let orderItems = [];
    for (let item of this.items) {
      orderItems.push({
        itemName: item.itemName,
        sellerUsername: item.sellerUsername,
        price: item.price,
        image: item.image,
        itemId: item.itemId});
    }
    const order = new OrderModel(
      orderItems,
      {
        method: this.userForm.value.method
      },
      {
        customerFirstName: localStorage.getItem('userFirstName'),
        customerLastName: localStorage.getItem('userLastName'),
        address: this.userForm.value.address,
        city: this.userForm.value.city,
        state: this.userForm.value.state,
        zipcode: this.userForm.value.zipcode,
        country: this.userForm.value.country,
        delivery_notes: "The notes",
      },
      new Date(),
      localStorage.getItem('userId'),
    );
    console.log("The Order");
    console.log(order);
    this.userProfileService.addToOrders(order)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.error(error)
      );
    this.userForm.reset();
  }

  toggleCheckout() {
    this.userProfileService.toggleCheckout();
  }


  onCloseHandled() {
    this.userProfileService.toggleCheckout();
  }

  receiveUserForm($event) {
    this.userForm = $event;
    this.checkout();
  }
}