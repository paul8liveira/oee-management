import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { FilterService } from '../../services/dashboard/filter.service';

@Component({
  selector: 'app-machine-production',
  templateUrl: './machine.production.component.html',
  styleUrls: ['./machine.production.component.css']
})
export class MachineProductionComponent extends BaseComponent implements OnInit, OnDestroy {
  private intervalTimer: any;
  public timerStr: string = "00:00:00";
  
  constructor(
    public toastr: ToastsManager, 
    private filterService: FilterService) 
  {
    super();              
  }

  ngOnInit() {
    this.startIntervalTimer();
  }

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
  }

  private startIntervalTimer() {
    let sec = 60;
    this.timerStr = this.secToTime(sec);
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(
      () => {
        sec--;       

        if(sec == 0) {
          console.log(sec)
          this.startIntervalTimer();          
          this.filterService.setRefreshingCountdown(true);
        }
        this.timerStr = this.secToTime(sec);
      }, 1000);
  }  
}
