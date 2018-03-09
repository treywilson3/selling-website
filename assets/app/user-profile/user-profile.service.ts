import {Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {EventEmitter, Injectable, Output} from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";
import {SuccessBannerService} from "../success-banner/success-banner.service";
import {CartItemModel} from "./cart-items/cart-item.model";
import {BoughtItemModel} from "./bought-items/bought-item.model";
import {OrderModel} from "./orders/order.model";
import {FormGroup} from "@angular/forms";

@Injectable()
export class UserProfileService {

  private cartItems: CartItemModel[] = [];
  private boughtItems: BoughtItemModel[] = [];
  private orderItems: OrderModel[] = [];

  isOpen: boolean = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() checkoutModal: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private http: Http, private errorService: ErrorService, private successBannerService: SuccessBannerService) {
  }

  buyItem(){}

  removeItem(){}

  addToCart(cart: CartItemModel) {
    const body = JSON.stringify(cart);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://localhost:3000/cart' + token, body, {headers: headers})
      .map((response: Response) => {
        response.json();
        this.successBannerService.showSuccess(response.json());
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  addToBought(bought: BoughtItemModel) {
    const body = JSON.stringify(bought);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://localhost:3000/bought' + token, body, {headers: headers})
      .map((response: Response) => {
        response.json();
        this.successBannerService.showSuccess(response.json());
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  addToOrders(order: OrderModel) {
    const body = JSON.stringify(order);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://localhost:3000/order' + token, body, {headers: headers})
      .map((response: Response) => {
        response.json();
        this.successBannerService.showSuccess(response.json());
      }, this.cartItems.splice(0, this.cartItems.length))
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getCartItems(id: string) {
    return this.http.get('http://localhost:3000/cart/' + id)
      .map((response: Response) => {
        const items = response.json().obj;
        let transformedItems: CartItemModel[] = [];
        for (let item of items.cartItems) {
          transformedItems.push(new CartItemModel(
            item.userId,
            item.itemName,
            item.sellerId,
            item.sellerUsername,
            item.price,
            item.itemInformation,
            item.image,
            item.active,
            item.itemId,
            item._id)
          );
        }
        this.cartItems = transformedItems;
        return transformedItems;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getOrders(id: string){
    return this.http.get('http://localhost:3000/order/' + id)
      .map((response: Response) => {
        const items = response.json().obj;
        let transformedItems: OrderModel[] = [];
        for (let order of items.orders) {
          let orderItems = [];
          for (let item of order.items) {
            orderItems.push({
              itemName: item.itemName,
              sellerUsername: item.sellerUsername,
              price: item.price,
              image: item.image,
              itemId: item.itemId,
            });
          }
          transformedItems.push(new OrderModel(
            orderItems,
            {method: order.payment[0].method},
            {
              customerFirstName: order.shipping[0].customerFirstName,
              customerLastName: order.shipping[0].customerLastName,
              address: order.shipping[0].address,
              city: order.shipping[0].city,
              state: order.shipping[0].state,
              country: order.shipping[0].country,
              delivery_notes: order.shipping[0].delivery_notes
            },
            order.orderDate,
            null,
            order._id
          ));
        }
        this.orderItems = transformedItems;
        return transformedItems;
      })

      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getSoldItems(id: string){
    return ;
  }

  getBoughtItems(id: string){
    return this.http.get('http://localhost:3000/bought/' + id)
      .map((response: Response) => {
        const items = response.json().obj;
        let transformedItems: BoughtItemModel[] = [];
        for (let item of items.boughtItems) {
          transformedItems.push(new BoughtItemModel(
            item.userId,
            item.itemName,
            item.sellerId,
            item.sellerUsername,
            item.price,
            item.itemInformation,
            item.image,
            item.itemId,
            item.boughtDate,
            item._id)
          );
        }
        this.boughtItems = transformedItems;
        return transformedItems;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getSellingItems(id: string){
    return ;
  }

  deleteItemFromCart(cart: CartItemModel) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete('http://localhost:3000/cart/' + cart.cartId + token)
      .map((response: Response) => response.json(), this.cartItems.splice(this.cartItems.indexOf(cart), 1))
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  beginCheckout(form: FormGroup){
    this.checkoutModal.emit(form);
  }

  toggleCheckout() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}