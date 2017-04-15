import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../user/user.service';
import {SteamUserInfoInterface} from '../steam/steam.user.interface';
import {SteamService} from '../steam/steam.service';
import {AppService} from '../app.service';

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
    gotGame: boolean = false;
    gameError: boolean = false;
    gameBackground: string = '';
    config: object;

    constructor(private userInfo: UserService, private steam: SteamService, private notify: AppService) {
        this.games = JSON.parse(localStorage.getItem('steamUserGamesList')) || [];
        this.appsCache = JSON.parse(localStorage.getItem('appsCache')) || {};
        notify.getMsg('accDeleted', () => {
            this.currUser = null;
            this.hasAccount = false;
            this.games = [];
            this.gamesCount = 0;
            this.gameDescr = null;
            this.currentApp = {};
        });
    }

    makeGameImage(appid, id) {
        return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${id}.jpg`;
    }

    loadGameDescr(game) {
        this.gotGame = false;
        this.gameError = false;
        const appid = game.appid;
        if (appid !== this.currentApp.appid) {
            this.currentApp.isActive = false;
            this.currentApp = game;
            this.currentApp.isActive = true;
            this.gameDescr = this.appsCache[appid] || {};
            this.steam.getAppInfo(appid).subscribe((descr) => {
                let gameJSON = JSON.parse(descr)[appid];
                this.gotGame = true;
                if(gameJSON && gameJSON.success && gameJSON.data){
                    this.gameBackground = gameJSON.data.background;
                    this.gameError = false;
                    this.appsCache[appid] = gameJSON;
                    this.gameDescr = gameJSON;
                    localStorage.setItem('appsCache', JSON.stringify(this.appsCache));
                } else {
                    this.gameBackground = '';
                    this.gameError = true;
                }
            });
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
        this.config = {};
    }
}

