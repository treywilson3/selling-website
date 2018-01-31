import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemsService} from "../items.service";
import {Item} from "../item.model";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  myForm: FormGroup;

  constructor(private itemService: ItemsService) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      itemName: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      itemInformation: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const active: boolean = true;
    const item = new Item(
      this.myForm.value.itemName,
      localStorage.getItem('userId'),
      localStorage.getItem('username'),
      this.myForm.value.price,
      this.myForm.value.itemInformation,
      this.myForm.value.image,
      active,
    );
    console.log(item);
    this.itemService.create(item)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
    this.myForm.reset();
  }
}
