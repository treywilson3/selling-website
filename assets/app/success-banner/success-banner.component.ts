import {Component, OnInit} from "@angular/core";
import {SuccessBannerModel} from "./success-banner.model";
import {SuccessBannerService} from "./success-banner.service";

@Component({
  selector: 'app-success',
  templateUrl: './success-banner.component.html'
})
export class SuccessBannerComponent implements OnInit {
  success: SuccessBannerModel;
  display = 'none';
  successLabel = 'Success! ';

  constructor(private successService: SuccessBannerService) {
  }

  onSuccessHandled() {
    this.display = 'none';
  }

  ngOnInit() {
    // change display to block bc that makes modal appear
    this.successService.successBanner
      .subscribe(
        (data: SuccessBannerModel) => {
          this.success = data;
          this.display = 'block';
        }
      );
  }
}