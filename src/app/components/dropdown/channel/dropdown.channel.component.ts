import { Component, ViewContainerRef, OnInit, Input } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel.service';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
import { FilterService } from '../../../services/dashboard/filter.service';
import { Channel } from '../../../models/channel';
 
@Component({
  selector: 'dropdown-channel',  
  templateUrl: './dropdown-channel.html',
})
export class DropdownChannelComponent extends BaseComponent implements OnInit {
  items: Array<any> = [];
  selectedChannelId: number;
  @Input() listAll: boolean;


  constructor(
    private channelService: ChannelService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {  
    this.load();     
  }

  load() {
    if(this.listAll == true) {
      this.list();
    }
    else {
      this.listByUser();     
    }
  }

  private listByUser() {
    this.channelService.listByUser(this.getCurrentUser().id)
    .subscribe(
      result => {
        this.items = result.filter(f => f.active.toString() === "Ativo");
        if(this.items.length > 0) {
          this.selectedChannelId = this.items[0].id;          
          this.setChannelLocalStorage(this.items[0]);
        }
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });    
  }

  private list() {
    this.channelService.listAll()
    .subscribe(
      result => {
        this.items = result.filter(f => f.active.toString() === "Ativo");
        if(this.items.length > 0) {
          this.selectedChannelId = this.items[0].id;
          this.setChannelLocalStorage(this.items[0]);
        }
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });    
  }

  public setChannelLocalStorage(channel: Channel) {
    this.selectedChannelId = channel.id;
    this.filterService.setChannelFilter(channel);  

    //guarda o canal no localstorage para ser utilizado em outros componentes
    localStorage.setItem('channelId', channel.id.toString());
  }    
}