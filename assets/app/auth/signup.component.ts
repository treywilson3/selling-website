import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";

import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  display: any = 'none';
  isOpen: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.username,
      this.myForm.value.firstName,
      this.myForm.value.lastName
    );
    this.authService.signup(user)
      .subscribe(
        data => {
          console.log(data);
          this.authService.toggleSignUp();
          this.router.navigateByUrl('/signin');
        },
        error => console.error(error)
      );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
    });
    this.authService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (this.isOpen) {
        this.display = 'block';
      } else {
        this.display = 'none';
      }
    });
  }

  onCloseHandled() {
    this.authService.toggleSignUp();
  }
}