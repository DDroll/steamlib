import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
    public authRequest: Observable<Response>;
    public requestSteamUserId: Observable<Response>;
    constructor( private http: Http ) {
        this.authRequest = this.http.get('/api/auth/login');
    }
}
