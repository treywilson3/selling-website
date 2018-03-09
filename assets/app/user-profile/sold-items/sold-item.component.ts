import {Component, Input, OnInit} from '@angular/core';
import {SoldItemModel} from "./sold-item.model";

@Component({
  selector: 'app-sold-item',
  templateUrl: './sold-item.component.html'
})
export class SoldItemComponent {
  @Input() item: SoldItemModel;

  constructor() {
  }

}