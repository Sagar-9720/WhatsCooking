import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomepageComponent } from './Pages/welcomepage/welcomepage.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AddRecipeComponent } from './Pages/add-recipe/add-recipe.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { ProfileComponent } from './Pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomepageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'addrecipe',
    component: AddRecipeComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'recipe', component: RecipeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
