import {EventEmitter} from "@angular/core";
import {SuccessBannerModel} from "./success-banner.model";

export class SuccessBannerService {
  successBanner = new EventEmitter<SuccessBannerModel>();

  showSuccess(success: any) {
    const successData = new SuccessBannerModel(success.message);
    this.successBanner.emit(successData);
  }
}