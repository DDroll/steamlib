import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import 'rxjs/Rx';
import { SteamService } from '../steam/steam.service'
import formatErrorMsg = jasmine.formatErrorMsg;
import {AppService} from "../app.service";
import {UserInfoService} from "../user/user-info-service.service";
import {SteamUserInfoInterface} from "../steam/steam-user-info-interface";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  apiKey: string = '';
  userId: string = '';
  error: string = '';
  currUser: SteamUserInfoInterface;
  hasAccount: boolean;

  constructor(private steam: SteamService, private userInfo: UserInfoService, private notify: AppService) {
    this.settingsForm = new FormGroup({
      'apiKey': new FormControl(this.apiKey),
      'userId': new FormControl(this.userId)
    });
    this.settingsForm.valueChanges.subscribe(data => {
      if(!data) {return;}
      this.apiKey = data.apiKey;
      this.userId = data.userId;
      this.error = '';
    });
  }

  subscribeAccountForm(){
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
      this.error = 'Заполните все поля!'
    }
  }

  saveAccount(){
    this.currUser.apikey = this.apiKey;
    this.userInfo.setUser(this.currUser);
    this.hasAccount = true;
  }

  deleteAccount(){
    this.userInfo.deleteUser();
    this.currUser = null;
    this.hasAccount = false;
    this.notify.sendMsg('accDeleted');
  }

  ngOnInit() {
    if(this.userInfo.checkUser()){
      this.currUser = this.userInfo.getUser();
      this.hasAccount = true;
    }
  }
}
