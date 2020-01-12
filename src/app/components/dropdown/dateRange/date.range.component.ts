import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { FilterService } from '../../../services/dashboard/filter.service';
import { BaseComponent } from '../../base.component';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-datetime-range',  
  templateUrl: './date.range.component.html'
})
export class DateRangeComponent extends BaseComponent implements OnInit, OnDestroy {
  dateTimeRange: Date[];
  private unsubscribe: Subscription[] = [];

  constructor(
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {
    super();
    this.listenFilters();    
  }

  ngOnInit() {           
  }

  ngOnDestroy() {   
    this.unsubscribe.forEach(f => f.unsubscribe());
  }   

  changeDateRange(dates: any): any {
    this.filterService.setDateRangeFilter(dates.value);
  }   

  private listenFilters() {
		const subsChannel = this.filterService.onChannelUpdate$.subscribe(channel => {
      //seta data inicial no selector conforme turno do canal
      let now = new Date(Date.now());
      this.dateTimeRange = [this.setTimeOnDatetime(now, (channel.initial_turn)), this.setTimeOnDatetime(now, (channel.final_turn))];			
      this.filterService.setDateRangeFilter(this.dateTimeRange);
    });  
		this.unsubscribe.push(subsChannel);    
  }  

}