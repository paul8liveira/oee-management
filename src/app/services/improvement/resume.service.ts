import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { ResumeImprovement } from '../../models/resume.improvement';

@Injectable()
export class ResumeService extends BaseService {
    constructor(private http: Http) {     
        super();
    }

    listAll(): Observable<ResumeImprovement[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});
    
        const channel_id = localStorage.getItem('channelId');
        const url = environment.resumeImprovementListAllURL.replace(":channel_id", channel_id);

        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    list(resume_id: number): Observable<ResumeImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});
    
        const channel_id = localStorage.getItem('channelId');
        const url = environment.resumeImprovementListAllURL.replace(":channel_id", channel_id.toString()).replace(":resume_id", resume_id.toString());

        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(resume: ResumeImprovement): Observable<ResumeImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                

        const channelId = localStorage.getItem('channelId');
        resume.channel_id = parseInt(channelId);

        return this.http.post(environment.resumeImprovementAddURL, 
            JSON.stringify(resume), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(resume: ResumeImprovement): Observable<ResumeImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });         
              
        return this.http.post(environment.resumeImprovementUpdateURL, 
            JSON.stringify(resume), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }
  
    delete(resume: ResumeImprovement): Observable<ResumeImprovement> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.resumeImprovementDeleteURL, 
            JSON.stringify(resume), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }  
}
