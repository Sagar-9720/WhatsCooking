import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomepageComponent } from './Pages/welcomepage/welcomepage.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AddRecipeComponent } from './Pages/add-recipe/add-recipe.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ViewAllRecipeComponent } from './Pages/view-all-recipe/view-all-recipe.component';
import { ModifyrecipeComponent } from './Pages/modifyrecipe/modifyrecipe.component';
import { ViewrecipeComponent } from './Pages/viewrecipe/viewrecipe.component';
import { LogoutComponent } from './Pages/logout/logout.component';
import { AuthGuard } from './Services/auth.guard';
const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomepageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modifyrecipe',
    component: ModifyrecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'view-all-recipe',
    component: ViewAllRecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewrecipe',
    component: ViewrecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signout',
    component: LogoutComponent,
  },
  {
    path: 'view-all-recipe',
    component: ViewAllRecipeComponent,
    data: { endorsed: true },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
