import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../user/user-info-service.service";
import {SteamUserInfoInterface} from "../steam/steam-user-info-interface";
import {SteamService} from "../steam/steam.service";
import { SlimScrollOptions } from 'ng2-slimscroll';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  currUser: SteamUserInfoInterface;
  hasAccount: boolean;
  games : Array<any>;
  appsCache: any;
  gamesCount: number;
  gameDescr: any;
  currentApp: string;
  slimOpts: SlimScrollOptions;

  constructor(private userInfo: UserInfoService, private steam: SteamService) {
      this.games = JSON.parse(localStorage.getItem('steamUserGamesList')) || [];
      this.appsCache = JSON.parse(localStorage.getItem('appsCache')) || {};
  }

  makeGameImage(appid, id){
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${id}.jpg`;
  }

  loadGameDescr(appid){
    if(appid !== this.currentApp){
      this.currentApp = appid;
      this.gameDescr = this.appsCache[appid] || {};
      this.steam.getAppInfo(appid).subscribe((descr)=>{
          this.appsCache[appid] = JSON.parse(descr)[appid];
          this.gameDescr = this.appsCache[appid];
          localStorage.setItem('appsCache', JSON.stringify(this.appsCache));
      })
    }
  }

  ngOnInit() {
    if(this.userInfo.checkUser()){
      this.currUser = this.userInfo.getUser();
      this.hasAccount = true;
      this.steam.getUserGames(this.currUser.apikey, this.currUser.steamid).subscribe((gamesResp) => {
          this.games = gamesResp.games.sort((a,b)=>{
            if(a.name > b.name){
              return 1;
            } else if(a.name < b.name ){
              return -1;
            } else {
              return 0;
            }
          });
          localStorage.setItem('steamUserGamesList', JSON.stringify(this.games));
          this.gamesCount = gamesResp.game_count;
        });
    }
      this.slimOpts = {
          position: 'right',
          barBackground: '#fff',
          barOpacity: '0.5',
          gridOpacity: '0.1'
      }
  }

}
