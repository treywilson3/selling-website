import {Component, OnInit} from '@angular/core';
import {Item} from "./item.model";
import {Router} from "@angular/router";
import {ItemsService} from "./items.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];

  constructor(private router: Router, private itemService: ItemsService) {
  }

  ngOnInit() {
    this.itemService.getItems()
      .subscribe(
        (items: Item[]) => {
          this.items = items;
        }
      );
  }
}