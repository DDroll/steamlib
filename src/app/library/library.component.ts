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
  games : Array<any> = [];
  gamesCount: number;
  gameDescr: any;
  currentApp: string;
    slimOpts: SlimScrollOptions;

  constructor(private userInfo: UserInfoService, private steam: SteamService) { }

  makeGameImage(appid, id){
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${id}.jpg`;
  }

  loadGameDescr(appid){
    if(appid !== this.currentApp){
      this.currentApp = appid;
      this.steam.getAppInfo(appid).subscribe((descr)=>{
        this.gameDescr = JSON.parse(descr)[appid];
      })
    }
  }

  ngOnInit() {
    if(this.userInfo.checkUser()){
      this.currUser = this.userInfo.getUser();
      this.hasAccount = true;
      if(this.games.length === 0){
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
          this.gamesCount = gamesResp.game_count;
        });
      }
    }
      this.slimOpts = {
          position: 'right',
          barBackground: '#fff',
          barOpacity: '0.5',
          gridOpacity: '0.1'
      }
  }

}
