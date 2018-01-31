import {EventEmitter, Injectable, Output} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {User} from "./user.model";
import {ErrorService} from "../errors/error.service";
import {SuccessBannerService} from "../success-banner/success-banner.service";
import {Item} from "../items/item.model";
import {UserProfile} from "./user-profile.model";

@Injectable()
export class AuthService {
  isOpen: boolean = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: Http, private errorService: ErrorService, private successService: SuccessBannerService) {
  }

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
      .map((response: Response) => {
        response.json();
        this.successService.showSuccess(response.json());
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  signin(user: User) {

    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  findUser(email: string) {
    return this.http.get('http://localhost:3000/user/' + email)
      .map((response: Response) => {
        const user = response.json().obj;
        let transformedUser: UserProfile = new UserProfile(user.email, user.username, user.firstName, user.lastName, user._id);
        return transformedUser;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  toggleSignUp() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }
}