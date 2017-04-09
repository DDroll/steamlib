import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SteamService {
    constructor( private http: Http ) {}
    testApiKeyAndUserId(apiKey: string, nick: string): Observable<any>{
        return this.http.get(`/api/steam/user-info?apikey=${apiKey}&nickname=${nick}`)
            .map(res => res.json())
            .map(res => res.response.players[0]);
    }

    getUserGames(apiKey: string, userId: string): Observable<any>{
        return this.http.get(`/api/steam/get-user-apps?apikey=${apiKey}&uid=${userId}`)
            .map(res => res.json())
            .map(res => res.response);
    }
    getAppInfo(appid: string): Observable<any>{
        return this.http.get(`/api/steam/get-app-details?appid=${appid}`)
            .map(res => res.json());
    }
}
