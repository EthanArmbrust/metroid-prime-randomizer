import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'help', redirectTo: 'help/modes', pathMatch: 'full' },
  { path: 'help/:article', component: HelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
