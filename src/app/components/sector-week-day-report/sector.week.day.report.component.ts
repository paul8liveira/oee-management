import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import {
  MachineWeekDayReporChartResponse,
  MachineWeekDayReporTableResponse,
  WeekDayReportParams,
} from "../../models/machine-week-day-report";
import { FilterService } from "../../services/dashboard/filter.service";
import { MachineWeekDayReportService } from "../../services/machine.week.day.report.service";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-sector-week-day-report",
  templateUrl: "./sector.week.day.report.component.html",
  styleUrls: ["./sector.week.day.report.component.css"],
})
export class SectorWeekDayReportComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  public channelId: number;
  public sectorId: number;
  public weekNumber: string;
  public yearNumber: string;
  public date: Date;

  public oeeDayData$: Observable<MachineWeekDayReporTableResponse[]>;
  public oeeWeekData$: Observable<MachineWeekDayReporTableResponse[]>;

  public pauseDayData$: Observable<MachineWeekDayReporChartResponse[]>;
  public pauseWeekData$: Observable<MachineWeekDayReporChartResponse[]>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private filterService: FilterService,
    private machineWeekDayReportService: MachineWeekDayReportService
  ) {
    super();
  }

  ngOnInit() {
    this.listenFilters();
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((f) => f.unsubscribe());
  }

  private listenFilters() {
    const subsChannel = this.filterService.onChannelUpdate$.subscribe(
      (channel) => {
        this.channelId = channel.id;
      }
    );
    const subsSector = this.filterService.onSectorUpdate$.subscribe(
      (sectorId) => {
        this.sectorId = sectorId;
        if (this.date) {
          this.fetchOeeDayData();
          this.fetchPauseDayData();
        }
        if (this.weekNumber && this.yearNumber) {
          this.fetchOeeWeekData();
          this.fetchPauseWeekData();
        }
      }
    );
    const subsDate = this.filterService.onDateUpdate$.subscribe((date) => {
      this.date = date;
      if (this.date) {
        this.fetchOeeDayData();
        this.fetchPauseDayData();
      }
    });
    const subsWeek = this.filterService.onweekUpdate$.subscribe((data) => {
      this.weekNumber = data.week.toString();
      this.yearNumber = data.year.toString();
      if (this.weekNumber && this.yearNumber) {
        this.fetchOeeWeekData();
        this.fetchPauseWeekData();
      }
    });
    this.unsubscribe.push(subsChannel);
    this.unsubscribe.push(subsSector);
    this.unsubscribe.push(subsDate);
    this.unsubscribe.push(subsWeek);
  }

  private fetchOeeDayData() {
    const params: Partial<WeekDayReportParams> = {
      channelId: this.channelId,
      sectorId: this.sectorId,
      weekNumber: "",
      yearNumber: "",
      dateIni: this.formatDateTimeMySQL(this.date, true),
      dateEnd: "",
    };
    this.oeeDayData$ = this.machineWeekDayReportService.table(params);
  }

  private fetchOeeWeekData() {
    const params: Partial<WeekDayReportParams> = {
      channelId: this.channelId,
      sectorId: this.sectorId,
      weekNumber: this.weekNumber,
      yearNumber: this.yearNumber,
      dateIni: "",
      dateEnd: "",
    };
    this.oeeWeekData$ = this.machineWeekDayReportService.table(params);
  }

  private fetchPauseDayData() {
    const params: Partial<WeekDayReportParams> = {
      channelId: this.channelId,
      sectorId: this.sectorId,
      weekNumber: "",
      yearNumber: "",
      dateIni: this.formatDateTimeMySQL(this.date, true),
      dateEnd: this.formatDateTimeMySQL(
        this.setTimeOnDatetime(this.date, this.getTurn().final),
        false
      ),
    };
    this.pauseDayData$ = this.machineWeekDayReportService.chart(params);
  }

  private fetchPauseWeekData() {
    const params: Partial<WeekDayReportParams> = {
      channelId: this.channelId,
      sectorId: this.sectorId,
      weekNumber: this.weekNumber,
      yearNumber: this.yearNumber,
      dateIni: "",
      dateEnd: "",
    };
    this.pauseWeekData$ = this.machineWeekDayReportService.chart(params);
  }
}
