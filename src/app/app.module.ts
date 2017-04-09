import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {LibraryComponent} from './library/library.component';
import {SettingsComponent} from './settings/settings.component';
import {AuthService} from './auth/auth.service';
import {LibraryService} from './library/library.service';
import {SteamService} from './steam/steam.service';
import {UserService} from './user/user.service';
import {AppService} from './app.service';
import {SlimScrollModule} from 'ng2-slimscroll';

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
        HttpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        SlimScrollModule,
        routing
    ],
    providers: [AuthService, SteamService, UserService, LibraryService, AppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
