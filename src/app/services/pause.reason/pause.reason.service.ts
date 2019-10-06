import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { PauseReason } from '../../models/pause.reason';

@Injectable()
export class PauseReasonService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    dropdown(channelId: number): Observable<PauseReason[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = environment.pauseReasonDropdownURL
            .replace(":channelId", channelId.toString());
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    
    list(id: number): Observable<PauseReason[]> {
        let headers = new Headers({
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = environment.pauseReasonListURL
            .replace(":id", id.toString());
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    listAll(): Observable<PauseReason[]> {
        let headers = new Headers({ 
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        const channel_id = localStorage.getItem('channelId')

        let url = environment.pauseReasonListAllURL
            .replace(":channelId", channel_id.toString());
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(pause: PauseReason): Observable<PauseReason> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        
        const channel_id = localStorage.getItem('channelId')

        return this.http.post(environment.pauseReasonAddURL, 
            JSON.stringify({
                channel_id: channel_id, 
                name: pause.name, 
                description: pause.description, 
                active: pause.active, 
                type: pause.type,
            }), { headers: headers })

            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(pause: PauseReason): Observable<PauseReason> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });

        return this.http.post(environment.pauseReasonUpdateURL, 
            JSON.stringify({
                pause_reason_id: pause.pause_reason_id,
                name: pause.name, 
                description: pause.description, 
                active: pause.active, 
                type: pause.type,
            }), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    delete(pause: PauseReason): Observable<PauseReason> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });

        return this.http.post(environment.pauseReasonDeleteURL, 
            JSON.stringify(pause), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }
}