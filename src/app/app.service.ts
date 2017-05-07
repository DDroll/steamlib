import {Injectable, ComponentRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AppService {

    currentObservables = {};

    constructor() {}

    sendMsg(message: string, data: Object, context) {
        if (this.currentObservables[message]) {
            this.currentObservables[message].next(data);
        }
    }

    getMsg(message: string, callback: Function, context) {
        console.log(context);
        if (!this.currentObservables[message]) {
            this.currentObservables[message] = new Subject();
        }
        this.currentObservables[message].subscribe((data?) => {
            callback(data || null);
        });
    }

}
