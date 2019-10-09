import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { ActionImprovement } from '../../models/action.improvement';

@Injectable()
export class ActionService extends BaseService {
    constructor(private http: Http) {     
        super();
    }

    list(action_id : number): Observable<ActionImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});
    
        const url = environment.actionImprovementListURL.replace(":action_id", action_id.toString());        

        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    listAll(): Observable<ActionImprovement[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});
    
        const channelId = localStorage.getItem('channelId');        
        const url = environment.actionImprovementListAllURL.replace(":channel_id", channelId.toString());

        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(improvement: ActionImprovement): Observable<ActionImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                

        if (improvement.finished_at == undefined) {
            improvement.finished_at = null
        }

        const channelId = localStorage.getItem('channelId');
        improvement.channel_id = parseInt(channelId);

        return this.http.post(environment.actionImprovementAddURL, 
            JSON.stringify(improvement), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(improvement: ActionImprovement): Observable<ActionImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });         
        if (improvement.finished_at == undefined) {
            improvement.finished_at = null
        }       
        return this.http.post(environment.actionImprovementUpdateURL, 
            JSON.stringify(improvement), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }
  
    delete(improvement: ActionImprovement): Observable<ActionImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.actionImprovementDeleteURL, 
            JSON.stringify(improvement), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }  
}
