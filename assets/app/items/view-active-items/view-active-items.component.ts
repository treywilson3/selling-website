import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ItemsService} from "../items.service";
import {Item} from "../item.model";
import {UserProfileService} from "../../user-profile/user-profile.service";
import {CartItemModel} from "../../user-profile/cart-items/cart-item.model";

@Component({
  selector: 'app-view-active-items',
  templateUrl: './view-active-items.component.html',
  styleUrls: ['./view-active-items.component.css']
})
export class ViewActiveItemsComponent implements OnInit {
  item: Item;
  id: string;

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.itemService.findItem(id).subscribe(
        (item: Item) => this.item = item
      );
    });
  }

  addToCart() {
    const cartItem = new CartItemModel(
      localStorage.getItem('userId'),
      this.item.itemName,
      this.item.sellerId,
      this.item.sellerUsername,
      this.item.price,
      this.item.itemInformation,
      this.item.image,
      this.item.active,
      this.item.itemId
    );
    this.userProfileService.addToCart(cartItem)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.error(error)
      );
  }
}
