import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel.service';
import { Observable, Subscription } from 'rxjs';
import { FilterService } from '../../../services/dashboard/filter.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  @Input() componentName: string;

  public logoUrl$: Observable<string>;
  private channelId: number;
  private unsubscribe: Subscription[] = [];

  constructor(private channelService: ChannelService, private filterService: FilterService) {
    this.listenFilters();
  }

  ngOnInit() {
        
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(f => f.unsubscribe());    
  }  

  private listenFilters() {
		const subsChannel = this.filterService.onChannelUpdate$.subscribe(channel => {
      this.logoUrl$ = this.channelService.getChannelLogo(channel.id);
    });  
		this.unsubscribe.push(subsChannel);    
  }     

}
