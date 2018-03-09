import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserProfileService} from "../user-profile.service";
import {User} from "../../auth/user.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userForm: FormGroup;
  display: any = 'none';
  isOpen: boolean;

  @Output() userFormEvent = new EventEmitter<FormGroup>();

  constructor(private userProfileService: UserProfileService) {
  }

  onSubmit() {
    this.userProfileService.toggleCheckout();
    this.userForm.reset();
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      method: new FormControl("default", Validators.required)
    });
    this.userProfileService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (this.isOpen) {
        this.display = 'block';
      } else {
        this.display = 'none';
      }
    });
  }

  onCloseHandled() {
    this.userProfileService.toggleCheckout();
  }

  sendUserForm() {
    this.userFormEvent.emit(this.userForm);
  }
}