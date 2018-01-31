import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing";
import {ItemHomeComponent} from "./item-home.component";
import {ItemsService} from "./items.service";
import {CreateItemComponent} from "./create-item/create-item.component";
import {ItemsComponent} from "./items.component";
import {ViewActiveItemsComponent} from "./view-active-items/view-active-items.component";

@NgModule({
  declarations: [
    ItemHomeComponent,
    ItemsComponent,
    CreateItemComponent,
    ViewActiveItemsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ItemsService]
})
export class ItemModule {

}