import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./auth/auth.service";
import {HttpModule} from "@angular/http";
import {ErrorService} from "./errors/error.service";
import {ErrorComponent} from "./errors/error.component";
import {SuccessBannerComponent} from "./success-banner/success-banner.component";
import {SuccessBannerService} from "./success-banner/success-banner.service";
import {AuthModule} from "./auth/auth.module";
import {SignupComponent} from "./auth/signup.component";
import {ItemModule} from "./items/item.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    SuccessBannerComponent,
    LandingPageComponent,
    DropdownDirective,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ItemModule,
    AuthModule
  ],
  providers: [AuthService, ErrorService, SuccessBannerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
