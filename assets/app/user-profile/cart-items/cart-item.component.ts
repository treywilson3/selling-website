import {Component, Input, OnInit} from '@angular/core';
import {UserProfileService} from "../user-profile.service";
import {CartItemModel} from "./cart-item.model";
import {BoughtItemModel} from "../bought-items/bought-item.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  @Input() item: CartItemModel;

  constructor(private userProfileService: UserProfileService) {
  }

  onDelete() {
    this.userProfileService.deleteItemFromCart(this.item)
      .subscribe(
        result => console.log(result)
      );
  }
  onBuy() {
    const bought = new BoughtItemModel(
      localStorage.getItem('userId'),
      this.item.itemName,
      this.item.sellerId,
      this.item.sellerUsername,
      this.item.price,
      this.item.itemInformation,
      this.item.image,
      this.item.itemId,
      new Date(),
      this.item.cartId
    );
    this.userProfileService.addToBought(bought)
      .subscribe(
        result => console.log(result)
      );
    this.onDelete();
  }


}