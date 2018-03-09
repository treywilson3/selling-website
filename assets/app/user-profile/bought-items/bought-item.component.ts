import {Component, Input, OnInit} from '@angular/core';
import {BoughtItemModel} from "./bought-item.model";

@Component({
  selector: 'app-bought-item',
  templateUrl: './bought-item.component.html'
})
export class BoughtItemComponent {
  @Input() item: BoughtItemModel;

  constructor() {
  }

}