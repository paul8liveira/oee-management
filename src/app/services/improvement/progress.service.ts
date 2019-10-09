import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { ProgressImprovement } from '../../models/progress.improvement';

@Injectable()
export class ProgressService extends BaseService {
    constructor(private http: Http) {     
        super();
    }

    list(progress_id: number): Observable<ProgressImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions( {headers: headers}  );

        const url = environment.progressImprovementListURL.replace(":progress_id", progress_id.toString());

        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    listByChannel(): Observable<ProgressImprovement[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions( {headers: headers}  );

        const channelId = localStorage.getItem('channelId');

        const url = environment.progressImprovementListAllURL.replace(":channel_id", channelId.toString());

        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(improvement: ProgressImprovement): Observable<ProgressImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                

        if (improvement.finished_at == undefined) {
            improvement.finished_at = null
        }

        return this.http.post(environment.progressImprovementAddURL, 
            JSON.stringify(improvement), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(improvement: ProgressImprovement): Observable<ProgressImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });         
        if (improvement.finished_at == undefined) {
            improvement.finished_at = null
        }       
        return this.http.post(environment.progressImprovementUpdateURL, 
            JSON.stringify(improvement), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }
  
    delete(improvement: ProgressImprovement): Observable<ProgressImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.progressImprovementDeleteURL, 
            JSON.stringify(improvement), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }  
}
