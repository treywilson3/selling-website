import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SignupComponent} from "./auth/signup.component";
import {SigninComponent} from "./auth/signin.component";
import {ItemHomeComponent} from "./items/item-home.component";
import {ITEMS_ROUTES} from "./items/items.routes";


const appRoutes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'items', component: ItemHomeComponent, children: ITEMS_ROUTES},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
