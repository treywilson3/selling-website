import {Component, Input, OnInit} from '@angular/core';
import {Item} from "./item.model";
import {Router} from "@angular/router";
import {ItemsService} from "./items.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent {
  @Input() item: Item;

  constructor() {
  }

}