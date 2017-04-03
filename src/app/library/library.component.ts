import {Component, OnInit, Input} from '@angular/core';
import {UserInfoService} from "../user/user-info-service.service";
import {SteamUserInfoInterface} from "../steam/steam-user-info-interface";
import {SteamService} from "../steam/steam.service";
import {SlimScrollOptions} from 'ng2-slimscroll';
import {AppService} from "../app.service";

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

    currUser: SteamUserInfoInterface;
    hasAccount: boolean;
    games: Array<any>;
    appsCache: any;
    gamesCount: number;
    gameDescr: any;
    currentApp: any = {};
    slimOpts: SlimScrollOptions;

    @Input() userLogout: any;

    constructor(private userInfo: UserInfoService, private steam: SteamService, private notify: AppService) {
        this.games = JSON.parse(localStorage.getItem('steamUserGamesList')) || [];
        this.appsCache = JSON.parse(localStorage.getItem('appsCache')) || {};
        notify.getMsg('accDeleted', () => {
            this.currUser = null;
            this.hasAccount = false;
            this.games = [];
            this.gamesCount = 0;
            this.gameDescr = null;
            this.currentApp = {};
        })
    }

    makeGameImage(appid, id) {
        return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${id}.jpg`;
    }

    loadGameDescr(game) {
        let appid = game.appid;
        if (appid !== this.currentApp.appid) {
            this.currentApp.isActive = false;
            this.currentApp = game;
            this.currentApp.isActive = true;
            this.gameDescr = this.appsCache[appid] || {};
            this.steam.getAppInfo(appid).subscribe((descr) => {
                this.appsCache[appid] = JSON.parse(descr)[appid];
                this.gameDescr = this.appsCache[appid];
                localStorage.setItem('appsCache', JSON.stringify(this.appsCache));
            })
        }
    }

    ngOnInit() {
        if (this.userInfo.checkUser()) {
            this.currUser = this.userInfo.getUser();
            this.hasAccount = true;
            this.steam.getUserGames(this.currUser.apikey, this.currUser.steamid).subscribe((gamesResp) => {
                this.games = gamesResp.games.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
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
