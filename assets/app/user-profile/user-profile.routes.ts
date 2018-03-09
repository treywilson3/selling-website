import {Routes} from "@angular/router";
import {CartItemsComponent} from "./cart-items/cart-items.component";
import {SoldItemsComponent} from "./sold-items/sold-items.component";
import {BoughtItemsComponent} from "./bought-items/bought-items.component";
import {SellingItemsComponent} from "./selling-items/selling-items.component";
import {OrdersComponent} from "./orders/orders.component";

export const USERPROFILE_ROUTES: Routes = [
  {path: '', redirectTo: 'cart', pathMatch: 'full'},
  {path: 'cart', component: CartItemsComponent},
  {path: 'sold', component: SoldItemsComponent},
  {path: 'bought', component: BoughtItemsComponent},
  {path: 'selling', component: SellingItemsComponent},
  {path: 'order', component: OrdersComponent},
];