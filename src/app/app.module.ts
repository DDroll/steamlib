import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routing } from  './app.routing';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service'
import { LibraryComponent } from './library/library.component';
import { LibraryService } from './library/library.service'
import { SettingsComponent } from './settings/settings.component';
import { SteamService } from './steam/steam.service'
import {UserInfoService} from "./user/user-info-service.service";
import { SlimScrollModule } from 'ng2-slimscroll';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LibraryComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
      SlimScrollModule,
    routing
  ],
  providers: [ AuthService, SteamService, UserInfoService, LibraryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
