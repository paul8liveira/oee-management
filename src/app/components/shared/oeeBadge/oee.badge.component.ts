import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../services/dashboard/filter.service';
import { Subscription, Observable } from 'rxjs';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { BaseComponent } from '../../base.component';
import * as moment from 'moment';
import { ChannelService } from '../../../services/channel/channel.service';

@Component({
  selector: 'app-oee-badge',
  templateUrl: './oee.badge.component.html',
  styleUrls: ['./oee.badge.component.css']
})
export class OEEBadgeComponent extends BaseComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  private dwmy: number = undefined;
  private channelId: number  = undefined;
  private machineCode: string  = undefined;  
  private dateRange: Date[] = undefined;

  public refreshing: boolean = false;  
  public oee: string = undefined;
  public machineName: string = undefined;
  public logoUrl$: Observable<string>;
  
  constructor(
    private filterService: FilterService, 
    private dashboardService: DashboardService,
    private channelService: ChannelService) { 
    super();
      this.listenFilters();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(f => f.unsubscribe());
  }  

  private listenFilters() {
		const subsCountdown = this.filterService.onCountdownUpdate$.subscribe(refresh => {      
      this.getProductionOEE();
    });
		const subsDWMY = this.filterService.onDWMYUpdate$.subscribe(dwmy => {      
      this.dwmy = dwmy;
      const dateRange = this.setDateByFilter(this.dwmy);
      this.dateRange = [moment(dateRange[0]).toDate(), moment(dateRange[1]).toDate()];;
    });
		const subsDateRange = this.filterService.onDateRangeUpdate$.subscribe(dateRange => {      
      this.dateRange = dateRange;
    });    
		const subsChannel = this.filterService.onChannelUpdate$.subscribe(channel => {
      this.channelId = channel.id;

      //seto null para aguardar a emissão do dados quando o dropdown de maquinas estiver carregado
      this.machineCode = null; 

      this.logoUrl$ = this.channelService.getChannelLogo(channel.id);
    });  
		const subsMachine = this.filterService.onMachineUpdate$.subscribe(machineCode => {
      this.machineCode = machineCode;
		});            
		this.unsubscribe.push(subsCountdown);    
		this.unsubscribe.push(subsDWMY);    
		this.unsubscribe.push(subsChannel);    
		this.unsubscribe.push(subsMachine);    
		this.unsubscribe.push(subsDateRange);    
  }

  private getProductionOEE() {  
    if(!this.dateRange || !this.channelId || !this.machineCode)
      return;  

    let dateRange: string[] = [this.formatDateTimeMySQL(this.dateRange[0], true), this.formatDateTimeMySQL(this.dateRange[1], false)]
      
    this.refreshing = true;
          
    this.dashboardService.productionOEE(
      dateRange[0], 
      dateRange[1], 
      this.channelId, 
      this.machineCode)
    .subscribe(
      result => {
        const productionOEE: Array<any> = []; 
        
        //rejeito result set "ok" do mysql
        for(let i = 0; i < result.length; i++) {
          //vou ter que resolver isso depois na proc, to sem paciencia agora
          if(result[i].length > 0) 
            productionOEE.push(result[i]);
        }

        if(!productionOEE[0]) return;
                
        //filtra oee conforme maquina selecionada e exibe 
        const oee = productionOEE[0].find(f => f.machine_code == this.machineCode);

        if(oee) {
          this.machineName = `OEE ${oee.machine_name}`; 
          this.oee = `${oee.oee}%`;  
        }
      
    },
    error => {
      console.log(error);
    });     
  }   
}
