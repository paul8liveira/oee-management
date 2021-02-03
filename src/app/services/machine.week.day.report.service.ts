import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import {
  MachineWeekDayReporChartResponse,
  MachineWeekDayReporTableResponse,
  WeekDayReportParams,
} from "../models/machine-week-day-report";
import { BaseService } from "./base.service";

@Injectable()
export class MachineWeekDayReportService extends BaseService {
  constructor(private http: Http) {
    super();
  }

  table(
    params: Partial<WeekDayReportParams>
  ): Observable<MachineWeekDayReporTableResponse[]> {
    const {
      channelId,
      machineCode,
      sectorId,
      weekNumber,
      yearNumber,
      dateIni,
      dateEnd,
    } = params;
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-access-token": this.getToken(),
    });
    const options = new RequestOptions({ headers: headers });
    let url = sectorId
      ? environment.sectorWeekDayReportTableURL
      : environment.machineWeekDayReportTableURL;

    if (machineCode) {
      url = url
        .replace(":machineCode", machineCode)
        .replace(":channelId", channelId.toString())
        .replace(":weekNumber", weekNumber)
        .replace(":yearNumber", yearNumber)
        .replace(":dateIni", dateIni)
        .replace(":dateEnd", dateEnd);
    }
    if (sectorId) {
      url = url
        .replace(":sectorId", sectorId.toString())
        .replace(":channelId", channelId.toString())
        .replace(":weekNumber", weekNumber)
        .replace(":yearNumber", yearNumber)
        .replace(":date", dateIni);
    }

    return this.http
      .get(url, options)
      .map((res) => res.json())
      .pipe(catchError(this.handleError));
  }

  chart(
    params: Partial<WeekDayReportParams>
  ): Observable<MachineWeekDayReporChartResponse[]> {
    const {
      channelId,
      machineCode,
      sectorId,
      weekNumber,
      yearNumber,
      dateIni,
      dateEnd,
    } = params;
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-access-token": this.getToken(),
    });
    const options = new RequestOptions({ headers: headers });
    let url = sectorId
      ? environment.sectorWeekDayReportChartURL
      : environment.machineWeekDayReportChartURL;

    if (machineCode) {
      url = url
        .replace(":machineCode", machineCode)
        .replace(":channelId", channelId.toString())
        .replace(":weekNumber", weekNumber)
        .replace(":yearNumber", yearNumber)
        .replace(":dateIni", dateIni)
        .replace(":dateEnd", dateEnd);
    }
    if (sectorId) {
      url = url
        .replace(":sectorId", sectorId.toString())
        .replace(":channelId", channelId.toString())
        .replace(":weekNumber", weekNumber)
        .replace(":yearNumber", yearNumber)
        .replace(":dateIni", dateIni)
        .replace(":dateEnd", dateEnd);
    }

    console.log('url');
    console.log(url);

    return this.http
      .get(url, options)
      .map((res) => res.json())
      .pipe(catchError(this.handleError));
  }
}
