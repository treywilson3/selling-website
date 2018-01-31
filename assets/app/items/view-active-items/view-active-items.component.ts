import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ItemsService} from "../items.service";
import {Item} from "../item.model";

@Component({
  selector: 'app-view-active-items',
  templateUrl: './view-active-items.component.html'
})
export class ViewActiveItemsComponent implements OnInit {
  item: Item;
  id: string;

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      this.itemService.findItem(id).subscribe(
        (item: Item) => this.item = item
      );
    });
  }
}
