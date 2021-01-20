import {
  Component,
  OnInit,
  ViewContainerRef,
  OnDestroy,
  Input,
  SimpleChange,
} from "@angular/core";
import { ToastsManager } from "ng2-toastr/src/toast-manager";
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { MachinePauseService } from "../../../services/machine.pause/machine.pause.service";
import { BaseComponent } from "../../base.component";
import { Subscription } from "rxjs";
import { FilterService } from "../../../services/dashboard/filter.service";
import { ProductService } from "../../../services/product/product.service";

@Component({
  selector: "app-machine-production-chart-pause-pareto",
  templateUrl: "./machine.prod.chart.pause.pareto.component.html",
  styleUrls: ["./machine.prod.chart.pause.pareto.component.css"],
})
export class MachineProductionChartPauseParetoComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  private dwmy: number = undefined;
  private channelId: number = undefined;
  private machineCode: string = undefined;
  public refreshing: boolean = false;

  private unsubscribe: Subscription[] = [];

  public chartPausa: AmChart;
  public chartProduto: AmChart;

  constructor(
    private machinePauseService: MachinePauseService,
    private productService: ProductService,
    private AmCharts: AmChartsService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {
    super();
    this.listenFilters();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.chartPausa = this.AmCharts.makeChart(
      "amChartParetoPausa",
      this.makeOptions([])
    );
    this.chartProduto = this.AmCharts.makeChart(
      "amChartParetoProduto",
      this.makeOptionsProduct([])
    );
  }

  ngOnDestroy() {
    if (this.chartPausa) {
      this.AmCharts.destroyChart(this.chartPausa);
    }
    if (this.chartProduto) {
      this.AmCharts.destroyChart(this.chartProduto);
    }
    this.unsubscribe.forEach((f) => f.unsubscribe());
  }

  private listenFilters() {
    const subsCountdown = this.filterService.onCountdownUpdate$.subscribe(
      () => {
        this.getParetoPauseData();
        this.getParetoProductData();
      }
    );
    const subsDWMY = this.filterService.onDWMYUpdate$.subscribe((dwmy) => {
      this.dwmy = dwmy;
    });
    const subsChannel = this.filterService.onChannelUpdate$.subscribe(
      (channel) => {
        this.channelId = channel.id;
      }
    );
    const subsMachine = this.filterService.onMachineUpdate$.subscribe(
      (machineCode) => {
        this.machineCode = machineCode;
      }
    );
    this.unsubscribe.push(subsCountdown);
    this.unsubscribe.push(subsDWMY);
    this.unsubscribe.push(subsChannel);
    this.unsubscribe.push(subsMachine);
  }

  private getParetoPauseData() {
    //retorna enquanto não tiver os filtros completos
    if (
      this.dwmy == undefined ||
      this.channelId == undefined ||
      this.machineCode == undefined
    )
      return;

    this.machinePauseService
      .pareto(this.channelId, this.machineCode, this.dwmy)
      .subscribe(
        (result) => {
          this.AmCharts.updateChart(this.chartPausa, () => {
            this.chartPausa.dataProvider.shift();
            if (result.pareto.length > 0) {
              this.chartPausa.dataProvider = result.pareto;
            } else {
              this.chartPausa.dataProvider = [
                {
                  pause_name_count: " ",
                  pause: 0,
                  sum_percentage: 0,
                },
              ];
            }
            this.chartPausa.validateData();
            this.refreshing = false;
          });
        },
        (error) => {
          this.toastr.error(error, "Erro!", {
            enableHTML: true,
            showCloseButton: true,
          });
        }
      );
  }

  private getParetoProductData() {
    //retorna enquanto não tiver os filtros completos
    if (
      this.dwmy == undefined ||
      this.channelId == undefined ||
      this.machineCode == undefined
    )
      return;

    this.productService
      .pareto(this.channelId, this.machineCode, this.dwmy)
      .subscribe(
        (result) => {
          this.AmCharts.updateChart(this.chartProduto, () => {
            this.chartProduto.dataProvider.shift();
            if (result.pareto.length > 0) {
              this.chartProduto.dataProvider = result.pareto;
            } else {
              this.chartProduto.dataProvider = [
                {
                  product_name_count: " ",
                  amount: 0,
                  sum_percentage: 0,
                },
              ];
            }
            this.chartProduto.validateData();
            this.refreshing = false;
          });
        },
        (error) => {
          this.toastr.error(error, "Erro!", {
            enableHTML: true,
            showCloseButton: true,
          });
        }
      );
  }

  makeOptions(dataProvider) {
    return {
      type: "serial",
      theme: "light",
      language: "pt",
      dataDateFormat: "YYYY-MM-DDTHH:NN:SS.QQQ",
      titles: [
        {
          text: "Diagrama de pareto de pausas",
          size: 15,
        },
      ],
      responsive: {
        enabled: true,
      },
      dataProvider: dataProvider,
      valueAxes: [
        {
          id: "v1",
          axisAlpha: 0,
          position: "left",
        },
        {
          id: "v2",
          axisAlpha: 0,
          position: "right",
          unit: "%",
          gridAlpha: 0,
          maximum: 100,
        },
      ],
      startDuration: 1,
      graphs: [
        {
          fillAlphas: 1,
          title: "Pause em minutos",
          type: "column",
          valueField: "pause",
          labelText: "[[pause]]",
          fillColors: "#1a3a5a",
          balloonFunction: function (graphDataItem, graph) {
            let text = `
              Tempo: ${graphDataItem.dataContext.pause_in_time}
              <br>Pausa: ${graphDataItem.dataContext.pause_name}
              <br>Tipo: ${graphDataItem.dataContext.pause_type}
              <br>Total: ${graphDataItem.dataContext.count}
            `;
            return text;
          },
        },
        {
          valueAxis: "v2",
          bullet: "round",
          lineThickness: 3,
          bulletSize: 7,
          bulletBorderAlpha: 1,
          bulletColor: "#FFFFFF",
          useLineColorForBulletBorder: true,
          fillAlphas: 0,
          lineAlpha: 1,
          title: "%",
          valueField: "sum_percentage",
          lineColor: "#A8CF45",
          balloonFunction: function (graphDataItem, graph) {
            let text = graphDataItem.dataContext.sum_percentage + "%";
            return text;
          },
        },
      ],
      categoryField: "pause_name_count",
      categoryAxis: {
        gridPosition: "start",
        axisAlpha: 0,
        tickLength: 0,
        labelRotation: 45,
      },
    };
  }

  makeOptionsProduct(dataProvider) {
    return {
      type: "serial",
      theme: "light",
      language: "pt",
      dataDateFormat: "YYYY-MM-DDTHH:NN:SS.QQQ",
      titles: [
        {
          text: "Diagrama de pareto de produtos",
          size: 15,
        },
      ],
      responsive: {
        enabled: true,
      },
      dataProvider: dataProvider,
      valueAxes: [
        {
          id: "v1",
          axisAlpha: 0,
          position: "left",
        },
        {
          id: "v2",
          axisAlpha: 0,
          position: "right",
          unit: "%",
          gridAlpha: 0,
          maximum: 100,
        },
      ],
      startDuration: 1,
      graphs: [
        {
          fillAlphas: 1,
          title: "Quantidade produzida",
          type: "column",
          valueField: "amount",
          labelText: "[[amount]]",
          fillColors: "#1a3a5a",
          balloonFunction: function (graphDataItem, graph) {
            let text = `
              Produção: ${graphDataItem.dataContext.amount}
              <br>Produto: ${graphDataItem.dataContext.product_name}
              <br>Total: ${graphDataItem.dataContext.count}
            `;
            return text;
          },
        },
        {
          valueAxis: "v2",
          bullet: "round",
          lineThickness: 3,
          bulletSize: 7,
          bulletBorderAlpha: 1,
          bulletColor: "#FFFFFF",
          useLineColorForBulletBorder: true,
          fillAlphas: 0,
          lineAlpha: 1,
          title: "%",
          valueField: "sum_percentage",
          lineColor: "#A8CF45",
          balloonFunction: function (graphDataItem, graph) {
            let text = graphDataItem.dataContext.sum_percentage + "%";
            return text;
          },
        },
      ],
      categoryField: "product_name_count",
      categoryAxis: {
        gridPosition: "start",
        axisAlpha: 0,
        tickLength: 0,
        labelRotation: 45,
      },
    };
  }
}
