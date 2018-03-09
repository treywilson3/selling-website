import {Component, Input, OnInit} from '@angular/core';
import {SellingItemModel} from "./selling-item.model";

@Component({
  selector: 'app-selling-item',
  templateUrl: './selling-item.component.html'
})
export class SellingItemComponent {
  @Input() item: SellingItemModel;

  constructor() {
  }

}