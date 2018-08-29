import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HelpComponent } from './help/help.component';

import { FileService } from './services/file.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationComponent,
    HelpComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
