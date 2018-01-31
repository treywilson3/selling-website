import {Routes} from "@angular/router";
import {CreateItemComponent} from "./create-item/create-item.component";
import {ItemsComponent} from "./items.component";
import {ViewActiveItemsComponent} from "./view-active-items/view-active-items.component";

export const ITEMS_ROUTES: Routes = [
  {path: '', component: ItemsComponent},
  {path: 'create-item', component: CreateItemComponent},
  {path: ':id', component: ViewActiveItemsComponent}
];