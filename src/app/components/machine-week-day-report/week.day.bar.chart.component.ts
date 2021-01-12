import { AmChart, AmChartsService } from "@amcharts/amcharts3-angular";
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
} from "@angular/core";
import { Observable } from "rxjs";
import { MachineWeekDayReporTableResponse } from "../../models/machine-week-day-report";

@Component({
  selector: "app-week-day-bar-chart",
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <div
          [attr.id]="chartId"
          [style.width.%]="100"
          [style.height.px]="300"
        ></div>
      </div>
    </div>
  `,
})
export class WeekDayBarChartComponent
  implements OnChanges, AfterViewInit, OnDestroy {
  @Input() title: string;
  @Input() chartId: string;
  @Input() data$: Observable<MachineWeekDayReporTableResponse[]>;

  private chart: AmChart;

  constructor(private AmCharts: AmChartsService) {}

  ngOnChanges() {
    if (this.data$) {
      this.data$.subscribe((data) => {
        this.AmCharts.updateChart(this.chart, () => {
          this.chart.dataProvider.shift();
          if (data.length > 0) {
            this.chart.dataProvider = data;
            this.chart.validateData();
          }
        });
      });
    }
  }

  ngAfterViewInit() {
    this.chart = this.AmCharts.makeChart(this.chartId, {
      dataProvider: [],
      type: "serial",
      theme: "light",
      graphs: [
        {
          balloonFunction: function (graphDataItem, graph) {
            let text = `
              Tempo: ${graphDataItem.dataContext.pause} minutos
              <br>Pausa: ${graphDataItem.dataContext.pause_name}
              <br>Tipo: ${graphDataItem.dataContext.pause_type}
              <br>Total: ${graphDataItem.dataContext.count}
            `;
            return text;
          },
          fillAlphas: 0.8,
          lineAlpha: 0.2,
          type: "column",
          valueField: "pause",
        },
      ],
      categoryField: "pause_name",
      categoryAxis: {
        gridPosition: "start",
        axisAlpha: 0,
        tickLength: 0,
        labelRotation: 45,
      },
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}
