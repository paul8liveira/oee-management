import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MachineWeekDayReporChartResponse, MachineWeekDayReporTableResponse, WeekDayReportParams } from '../models/machine-week-day-report';
import { BaseService } from './base.service';

@Injectable()
export class MachineWeekDayReportService extends BaseService {
  constructor(private http: Http) {
    super();
  }

  table(params: WeekDayReportParams): Observable<MachineWeekDayReporTableResponse[]> {
    const { channelId, machineCode, weekNumber, yearNumber, dateIni, dateEnd } = params;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.getToken(),
    });
    const options = new RequestOptions({ headers: headers });
    const url = environment.machineWeekDayReportTableURL
      .replace(':channelId', channelId.toString())
      .replace(':machineCode', machineCode)
      .replace(':weekNumber', weekNumber)
      .replace(':yearNumber', yearNumber)
      .replace(':dateIni', dateIni)
      .replace(':dateEnd', dateEnd);
    return this.http
      .get(url, options)
      .map((res) => res.json())
      .pipe(catchError(this.handleError));
  }

  chart(params: WeekDayReportParams): Observable<MachineWeekDayReporChartResponse[]> {
    const { channelId, machineCode, weekNumber, yearNumber, dateIni, dateEnd } = params;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.getToken(),
    });
    const options = new RequestOptions({ headers: headers });
    const url = environment.machineWeekDayReportChartURL
      .replace(':channelId', channelId.toString())
      .replace(':machineCode', machineCode)
      .replace(':weekNumber', weekNumber)
      .replace(':yearNumber', yearNumber)
      .replace(':dateIni', dateIni)
      .replace(':dateEnd', dateEnd);
    return this.http
      .get(url, options)
      .map((res) => res.json())
      .pipe(catchError(this.handleError));
  }
}
