import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdToolbarModule,
  MdSidenavModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdSelectModule,
  MdButtonModule,
  MdListModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {RandomizerComponent} from './randomizer/randomizer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ModesPageComponent } from './modes-page/modes-page.component';
import { LogicsPageComponent } from './logics-page/logics-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomizerComponent,
    HomePageComponent,
    ModesPageComponent,
    LogicsPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdSidenavModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSelectModule,
    MdButtonModule,
    MdListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
