import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html'
})
export class OrderItemComponent {
  @Input() item: any;

  constructor() {
  }

}