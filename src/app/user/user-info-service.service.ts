import {Injectable} from '@angular/core';
import {SteamUserInfoInterface} from '../steam/steam-user-info-interface'
import * as _ from "lodash";

@Injectable()
export class UserInfoService {

    currentUser: SteamUserInfoInterface;
    userIsSetted: boolean;

    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('steamUser'));
        this.userIsSetted = !_.isEmpty(this.currentUser);
    }

    getUser() {
        return this.currentUser;
    }

    checkUser() {
        return this.userIsSetted;
    }

    setUser(user) {
        this.currentUser = user;
        this.userIsSetted = true;
        localStorage.setItem('steamUser', JSON.stringify(this.currentUser));
    }

    deleteUser() {
        this.currentUser = null;
        this.userIsSetted = false;
        localStorage.removeItem('steamUser');
        localStorage.removeItem('appsCache');
        localStorage.removeItem('steamUserGamesList');
    }
}
