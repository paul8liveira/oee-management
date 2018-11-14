import { 
  Component, 
  OnInit, 
  ViewContainerRef, 
  EventEmitter, 
  Output, 
  OnDestroy, 
  Input,
  SimpleChange } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { Dashboard } from '../../models/dashboard';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-lastfeed',
  templateUrl: './lastFeed.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class LastFeedComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() channelId: number;
  channelIdSelected:  number = 0;
  @Input() date: Date[];
  dateIniSelected: string;
  dateFinSelected: string;
  @Input() machineCode: string;
  machineCodeSelected: string = "";

  lastFeed: Array<Dashboard["lastFeed"]> = [];
  pauses: Dashboard["pauses"] = [];
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 25;

  @Output() refreshDash = new EventEmitter<boolean>();
  intervalTimer: any;
  timerStr: string = "00:00:00";

  productionCount: Array<any> = [];
  productionCount1: Array<any> = [];
  
  constructor(private dashboardService: DashboardService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {   
      super();
      this.toastr.setRootViewContainerRef(vcr);    
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.channelIdSelected = changes.channelId && changes.channelId.currentValue != null ? 
      changes.channelId.currentValue : this.channelIdSelected;

    this.machineCodeSelected = changes.machineCode && changes.machineCode.currentValue != null ? 
      changes.machineCode.currentValue : this.machineCodeSelected;  

    this.dateIniSelected = changes.date ? this.formatDateTimeMySQL(changes.date.currentValue[0], true) : this.dateIniSelected;
    this.dateFinSelected = changes.date ? this.formatDateTimeMySQL(changes.date.currentValue[1], false) : this.dateFinSelected;
    
    if(this.channelIdSelected == 0 || !this.machineCodeSelected)
      return;
     
    this.getLastFeed();
    this.getProductionCount(1);  
    this.getProductionCount(2);  
  }  

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;        
  }

  setColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Canal",
        field: "channel_name",
      },
      {
        headerName: "Maquina",
        field: "machine_name",
      },      
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field1_desc : "",
        field: "field1",
      },  
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field2_desc : "",
        field: "field2",
      },              
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field3_desc : "",
        field: "field3",
      },             
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field4_desc : "",
        field: "field4",
      },       
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field5_desc : "",
        field: "field5",
      },   
      {
        headerName: "Inserido em",
        field: "inserted_at",
      },           
    ];    
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  refreshNow() {
    this.getLastFeed();
    this.refreshDash.emit(true);    
  }  

  getLastFeed() {    
    this.gridApi.showLoadingOverlay();
    this.dashboardService.lastFeed(this.dateIniSelected, this.dateFinSelected, this.channelIdSelected, this.machineCodeSelected, this.getCurrentUser().id)
    .subscribe(
      result => {        
        this.lastFeed = result.lastFeeds;
        this.pauses = result.pauses;
        this.startIntervalTimer();

        if(this.lastFeed.length > 0) {
          this.setColumnDefs();
          this.gridApi.setRowData(this.lastFeed);        
          this.gridApi.sizeColumnsToFit();          
        }
        this.gridApi.hideOverlay();        
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });
  }

  startIntervalTimer() {
    let sec = this.lastFeed[0] ? this.lastFeed[0].refresh_time : 300;
    this.timerStr = this.secToTime(sec);
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(
      () => {
        sec--;
        if(sec == 0) {
          this.refreshNow();
          this.getProductionCount(1);
          this.getProductionCount(2);
        }
        this.timerStr = this.secToTime(sec);
      }, 1000);
  }   

  getProductionCount(position: number) {
    this.dashboardService.productionCount(this.dateIniSelected, this.dateFinSelected, this.channelIdSelected, position)
    .subscribe(
      result => {
        if(position === 1)
          this.productionCount = [];
        else
          this.productionCount1 = [];

        //pega colunas para exibir na lista
        let columsArray = [];
        for(let col in result[0]) {
          if(col.indexOf("MAQ_") > -1)
            columsArray.push(col.replace("MAQ_",""));
        }

        let totalizador = {
          totalHora : 0,
          mediaTaxa: 0
        };

        //faz calculo inverso: 1-0, 2-1, 3-2, etc
        for(let i = 0; i < result.length; i++) {            
          if(i > 0) {
            let total = result[i].total -= result[i-1].total_ref;
            result[i].total = total < 0 ? 0 : total; //controle para negativos
            
            let taxa = Math.round((result[i].taxa - result[i-1].taxa_ref) * 100) / 100;
            result[i].taxa = taxa < 0 ? 0 : taxa; //controle para negativos
          }            
          totalizador.totalHora += result[i].total;
          totalizador.mediaTaxa += result[i].taxa;
        }
        totalizador.mediaTaxa = Math.round((totalizador.mediaTaxa / result.length) * 100) / 100;
        
        if(position === 1) {
          this.productionCount.push(result);          
          this.productionCount.push(totalizador);
          this.productionCount.push(columsArray);
          console.log(this.productionCount);
        }
        else {
          this.productionCount1.push(result);          
          this.productionCount1.push(totalizador);
          this.productionCount1.push(columsArray);
          console.log(this.productionCount1);          
        }

      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });     
  }  
}
