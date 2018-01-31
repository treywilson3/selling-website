import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {User} from "./user.model";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.password);
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('username', data.username);
          this.router.navigateByUrl('/');
        },
        error => console.error(error)
      );
    this.authService.findUser(this.myForm.value.email)
      .subscribe(
        data => {
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('username', data.username);
          localStorage.setItem('userFirstName', data.firstName);
          localStorage.setItem('userLastName', data.lastName);
          localStorage.setItem('userId', data.userId);
        },
        error => console.error(error)
      );

    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }
}