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
  selector: "app-machine-week-day-report",
  templateUrl: "./machine.week.day.report.component.html",
  styleUrls: ["./machine.week.day.report.component.css"],
})
export class MachineWeekDayReportComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  public channelId: number;
  public machineCode: string;
  public weekNumber: string;
  public yearNumber: string;
  public date: Date;

  public tableDayData$: Observable<MachineWeekDayReporTableResponse[]>;
  public chartDayData$: Observable<MachineWeekDayReporChartResponse[]>;

  public tableWeekData$: Observable<MachineWeekDayReporTableResponse[]>;
  public chartWeekData$: Observable<MachineWeekDayReporChartResponse[]>;

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
    const subsMachine = this.filterService.onMachineUpdate$.subscribe(
      (machineCode) => {
        this.machineCode = machineCode;
        if (this.date) {
          this.fetchTableDayData();
          this.fetchChartDayData();
        }
        if (this.weekNumber && this.yearNumber) {
          this.fetchTableWeekData();
          this.fetchChartWeekData();
        }
      }
    );
    const subsDate = this.filterService.onDateUpdate$.subscribe((date) => {
      this.date = date;
      if (this.date) {
        this.fetchTableDayData();
        this.fetchChartDayData();
      }
    });
    const subsWeek = this.filterService.onweekUpdate$.subscribe((data) => {
      this.weekNumber = data.week.toString();
      this.yearNumber = data.year.toString();
      if (this.weekNumber && this.yearNumber) {
        this.fetchTableWeekData();
        this.fetchChartWeekData();
      }
    });
    this.unsubscribe.push(subsChannel);
    this.unsubscribe.push(subsMachine);
    this.unsubscribe.push(subsDate);
    this.unsubscribe.push(subsWeek);
  }

  private fetchTableDayData() {
    const params: WeekDayReportParams = {
      channelId: this.channelId,
      machineCode: this.machineCode,
      weekNumber: "",
      yearNumber: "",
      dateIni: this.formatDateTimeMySQL(this.date, true),
      dateEnd: this.formatDateTimeMySQL(
        this.setTimeOnDatetime(this.date, this.getTurn().final),
        false
      ),
    };
    this.tableDayData$ = this.machineWeekDayReportService.table(params);
  }

  private fetchChartDayData() {
    const params: WeekDayReportParams = {
      channelId: this.channelId,
      machineCode: this.machineCode,
      weekNumber: "",
      yearNumber: "",
      dateIni: this.formatDateTimeMySQL(this.date, true),
      dateEnd: this.formatDateTimeMySQL(
        this.setTimeOnDatetime(this.date, this.getTurn().final),
        false
      ),
    };
    this.chartDayData$ = this.machineWeekDayReportService.chart(params);
  }

  private fetchTableWeekData() {
    const params: WeekDayReportParams = {
      channelId: this.channelId,
      machineCode: this.machineCode,
      weekNumber: this.weekNumber,
      yearNumber: this.yearNumber,
      dateIni: "",
      dateEnd: "",
    };
    this.tableWeekData$ = this.machineWeekDayReportService.table(params);
  }

  private fetchChartWeekData() {
    const params: WeekDayReportParams = {
      channelId: this.channelId,
      machineCode: this.machineCode,
      weekNumber: this.weekNumber,
      yearNumber: this.yearNumber,
      dateIni: "",
      dateEnd: "",
    };
    this.chartWeekData$ = this.machineWeekDayReportService.chart(params);
  }
}
