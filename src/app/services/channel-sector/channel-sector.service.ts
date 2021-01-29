import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { Product } from '../../models/product';
import { MachineParetoList } from '../../models/machine.pareto.list';

@Injectable()
export class ChannelSectorService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    list(channelId: number): Observable<Product[]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = `${environment.channelSectorURL}/${channelId}`;
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }
}
