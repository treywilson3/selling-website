import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private firstName: string;
  private lastName: string;
  private userFullName: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {}

  isLoggedIn() {
    this.firstName = localStorage.getItem('userFirstName');
    this.lastName = localStorage.getItem('userLastName');
    this.userFullName = this.firstName + " " + this.lastName;
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleSignUp() {
    this.authService.toggleSignUp();
  }
}