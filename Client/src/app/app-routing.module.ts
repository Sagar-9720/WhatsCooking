import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomepageComponent } from './Pages/welcomepage/welcomepage.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomepageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
