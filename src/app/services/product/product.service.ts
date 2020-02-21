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
export class ProductService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    list(channelId: number, machine_code: string = ''): Observable<Product[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = `${environment.productURL}/${channelId}/${machine_code}`;
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(product: Product): Observable<Product> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.productURL, 
            JSON.stringify(product), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(product: Product): Observable<Product> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(`${environment.productURL}/update`, 
            JSON.stringify(product), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }     
    
    delete(product: Product): Observable<Product> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(`${environment.productURL}/delete`, 
            JSON.stringify(product), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }   
    
    pareto(channelId: number, machineCode: string, filter: number): Observable<MachineParetoList> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let params = {
            channel_id: channelId,
            machine_code: machineCode,
            filter: filter
        };
        let options = new RequestOptions({
            headers: headers, 
            search: params
        });

        return this.http.get(environment.machineProductChartParetoURL, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }    
}