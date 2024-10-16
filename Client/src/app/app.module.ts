import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WelcomepageComponent } from './Pages/welcomepage/welcomepage.component';

import { HomePageComponent } from './Pages/home-page/home-page.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NavsComponent } from './Components/navs/navs.component';
import { SearchComponent } from './Components/search/search.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AddRecipeComponent } from './Pages/add-recipe/add-recipe.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { LoginComponent } from './Pages/login/login.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { RegisterComponent } from './Pages/register/register.component';
import { RouterModule } from '@angular/router';
import { ViewAllRecipeComponent } from './Pages/view-all-recipe/view-all-recipe.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    HomePageComponent,
    NavbarComponent,
    NavsComponent,
    SearchComponent,
    RecipeComponent,
    FooterComponent,
    AddRecipeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ViewAllRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
