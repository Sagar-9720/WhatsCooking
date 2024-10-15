import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WelcomepageComponent } from './Pages/welcomepage/welcomepage.component';
import { LoginpageComponent } from './Pages/loginpage/loginpage.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NavsComponent } from './Components/navs/navs.component';
import { SearchComponent } from './Components/search/search.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { FooterComponent } from './Components/footer/footer.component';
@NgModule({
  declarations: [AppComponent, WelcomepageComponent, LoginpageComponent, HomePageComponent, NavbarComponent, NavsComponent, SearchComponent, RecipeComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
