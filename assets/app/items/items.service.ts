import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { ErrorService } from "../errors/error.service";
import {SuccessBannerService} from "../success-banner/success-banner.service";
import {Item} from "./item.model";

@Injectable()
export class ItemsService {

  private items: Item[] = [];

  constructor(private http: Http, private errorService: ErrorService, private successBannerService: SuccessBannerService){}

  create(item: Item) {
    const body = JSON.stringify(item);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://localhost:3000/item' + token, body, {headers: headers})
      .map((response: Response) => {
        response.json();
        this.successBannerService.showSuccess(response.json());
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  getItems() {
    return this.http.get('http://localhost:3000/item')
      .map((response: Response) => {
        const items = response.json().obj;
        let transformedItems: Item[] = [];
        for (let item of items) {
          transformedItems.push(new Item(
            item.itemName,
            item.sellerId,
            item.sellerUsername,
            item.price,
            item.itemInformation,
            item.image,
            item.active,
            item._id)
          );
        }
        this.items = transformedItems;
        return transformedItems;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  findItem(id: string) {
    return this.http.get('http://localhost:3000/item/' + id)
      .map((response: Response) => {
        const item = response.json().obj;
        let transformedItem: Item = new Item(item.itemName, item.sellerId, item.sellerUsername, item.price, item.itemInformation, item.image, item.active, item._id);
        return transformedItem;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
}
