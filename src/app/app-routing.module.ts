import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';


const routes: Routes = [
  // {path: 'startup', component: StartupPageComponent, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent},
  {path: 'details', component: ShopDetailsComponent},
  {path: 'home', component: HomeComponent},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
