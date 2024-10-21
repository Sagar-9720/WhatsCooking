import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WelcomepageComponent } from './Pages/welcomepage/welcomepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ModifyrecipeComponent } from './Pages/modifyrecipe/modifyrecipe.component';
import { ViewrecipeComponent } from './Pages/viewrecipe/viewrecipe.component';
import { LogoutComponent } from './Pages/logout/logout.component';
import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfirmdeleteComponent } from './Components/confirmdelete/confirmdelete.component';
import { EndorseRecipeComponent } from './Pages/endorse-recipe/endorse-recipe.component';
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
    ModifyrecipeComponent,
    ViewrecipeComponent,
    LogoutComponent,
    ConfirmdeleteComponent,
    EndorseRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
