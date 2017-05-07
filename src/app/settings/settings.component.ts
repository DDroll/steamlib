import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import 'rxjs/Rx';
import { SteamService } from '../steam/steam.service';
import {AppService} from '../app.service';
import {UserService} from '../user/user.service';
import {SteamUserInfoInterface} from '../steam/steam.user.interface';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {

    settingsForm: FormGroup;
    apiKey = '';
    userId = '';
    error = '';
    currUser: SteamUserInfoInterface;
    hasAccount: boolean;

    constructor(private steam: SteamService, private userInfo: UserService, private notify: AppService) {
        this.settingsForm = new FormGroup({
            'apiKey': new FormControl(this.apiKey),
            'userId': new FormControl(this.userId)
        });
        this.settingsForm.valueChanges.subscribe(data => {
            if (!data) { return; }
            this.apiKey = data.apiKey;
            this.userId = data.userId;
            this.error = '';
        });
    }

    subscribeAccountForm() {
        if (this.userId && this.apiKey) {
            this.steam.testApiKeyAndUserId(this.apiKey, this.userId)
                .subscribe(data => {
                    if (data) {
                        if(data.error){
                            this.error = data.error;
                            return;
                        }
                        this.currUser = data;
                    } else {
                        this.error = 'Введенные данные неверны';
                    }
                });
        } else {
            this.error = 'Заполните все поля!';
        }
    }

    saveAccount() {
        this.currUser.apikey = this.apiKey;
        this.userInfo.setUser(this.currUser);
        this.hasAccount = true;
    }

    deleteAccount() {
        this.userInfo.deleteUser();
        this.currUser = null;
        this.hasAccount = false;
        this.notify.sendMsg('accDeleted', {}, this);
    }

    sendEvent(){
        this.notify.sendMsg('ololo',{ 'coll' : 'yep' }, this);
    }

    ngOnInit() {
        if (this.userInfo.checkUser()) {
            this.currUser = this.userInfo.getUser();
            this.hasAccount = true;
        }
    }
}
