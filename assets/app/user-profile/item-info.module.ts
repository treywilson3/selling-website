import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing";
import {CartItemsComponent} from "./cart-items/cart-items.component";
import {ItemInfoHomeComponent} from "./item-info-home.component";
import {SoldItemComponent} from "./sold-items/sold-item.component";
import {SoldItemsComponent} from "./sold-items/sold-items.component";
import {BoughtItemComponent} from "./bought-items/bought-item.component";
import {BoughtItemsComponent} from "./bought-items/bought-items.component";
import {SellingItemComponent} from "./selling-items/selling-item.component";
import {SellingItemsComponent} from "./selling-items/selling-items.component";
import {CartItemComponent} from "./cart-items/cart-item.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {OrderComponent} from "./orders/order.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrderItemComponent} from "./orders/order-item.component";

@NgModule({
  declarations: [
    CartItemComponent,
    CartItemsComponent,
    ItemInfoHomeComponent,
    SoldItemComponent,
    SoldItemsComponent,
    BoughtItemComponent,
    BoughtItemsComponent,
    SellingItemComponent,
    SellingItemsComponent,
    CheckoutComponent,
    OrderItemComponent,
    OrderComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: []
})
export class ItemInfoModule {

}