import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import {
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

  public tableDayData$: Observable<MachineWeekDayReporTableResponse[]>;
  public tableWeekData$: Observable<MachineWeekDayReporTableResponse[]>;

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
          this.fetchTableDayData();
        }
        if (this.weekNumber && this.yearNumber) {
          this.fetchTableWeekData();
        }
      }
    );
    const subsDate = this.filterService.onDateUpdate$.subscribe((date) => {
      this.date = date;
      if (this.date) {
        this.fetchTableDayData();
      }
    });
    const subsWeek = this.filterService.onweekUpdate$.subscribe((data) => {
      this.weekNumber = data.week.toString();
      this.yearNumber = data.year.toString();
      if (this.weekNumber && this.yearNumber) {
        this.fetchTableWeekData();
      }
    });
    this.unsubscribe.push(subsChannel);
    this.unsubscribe.push(subsSector);
    this.unsubscribe.push(subsDate);
    this.unsubscribe.push(subsWeek);
  }

  private fetchTableDayData() {
    const params: Partial<WeekDayReportParams> = {
      channelId: this.channelId,
      sectorId: this.sectorId,
      weekNumber: "",
      yearNumber: "",
      dateIni: this.formatDateTimeMySQL(this.date, true),
      dateEnd: "",
    };
    this.tableDayData$ = this.machineWeekDayReportService.table(params);
  }

  private fetchTableWeekData() {
    const params: Partial<WeekDayReportParams> = {
      channelId: this.channelId,
      sectorId: this.sectorId,
      weekNumber: this.weekNumber,
      yearNumber: this.yearNumber,
      dateIni: "",
      dateEnd: "",
    };
    this.tableWeekData$ = this.machineWeekDayReportService.table(params);
  }
}
