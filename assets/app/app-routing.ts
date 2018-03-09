import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SignupComponent} from "./auth/signup.component";
import {SigninComponent} from "./auth/signin.component";
import {ItemHomeComponent} from "./items/item-home.component";
import {ITEMS_ROUTES} from "./items/items.routes";
import {USERPROFILE_ROUTES} from "./user-profile/user-profile.routes";
import {ItemInfoHomeComponent} from "./user-profile/item-info-home.component";


const appRoutes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'items', component: ItemHomeComponent, children: ITEMS_ROUTES},
  {path: 'user', component: ItemInfoHomeComponent, children: USERPROFILE_ROUTES},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
