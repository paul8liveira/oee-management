import { Component, OnInit, ViewContainerRef, OnDestroy } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ChannelService } from "../../../services/channel/channel.service";
import { ToastsManager } from 'ng2-toastr';
import { Channel } from "../../../models/channel";
import { UserChannel } from "../../../models/user.channel";
import { UserService } from "../../../services/user/user.service";
import { Subscription } from "rxjs";
import { FilterService } from "../../../services/dashboard/filter.service";

@Component({
    selector: 'modal-content',
    template: `
      <div class="modal-header">
        <h5 class="modal-title pull-left">{{title}}</h5>
        <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <dropdown-channel [listAll]="true"></dropdown-channel>
          <button type="button" class="btn btn-outline-primary" (click)="add()">Adicionar</button>
        </div>
        <table class="table table-hover table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Status</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let channel of channels">
              <td>{{channel.name}}</td>
              <td>{{channel.active}}</td>
              <td>
                <div class="btn-group btn-group-sm" role="group" aria-label="Acoes">
                  <button type="button" class="btn btn-outline-danger" (click)="delete(channel.id)" title="Remover canal">
                    <fa name="minus-circle"></fa>
                  </button>
                </div>              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="bsModalRef.hide()">Fechar</button>
      </div>
      `
  })
   
  export class UserChannelModalComponent implements OnInit, OnDestroy {
    title: string;
    userId: number;
    channels: Array<Channel> = [];
    userChannel: UserChannel = new UserChannel();
    private unsubscribe: Subscription[] = []; 
   
    constructor(
      public bsModalRef: BsModalRef,
      private channelService: ChannelService,
      private userService: UserService,
      public toastr: ToastsManager,
      vcr: ViewContainerRef,
      private filterService: FilterService) {
        this.toastr.setRootViewContainerRef(vcr); 
        this.listenFilters();        
    }
   
    ngOnInit() {
      this.userChannel.userId = this.userId;
      this.loadGrid();
    }

    ngOnDestroy() {    
      this.unsubscribe.forEach(f => f.unsubscribe());
    }      

    loadGrid() {
      this.channelService.listByUser(this.userChannel.userId)
      .subscribe(
        result => {
          this.channels = result;
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        });      
    }

    private listenFilters() {
      const subsChannel = this.filterService.onChannelUpdate$.subscribe(channel => {        
        this.setChannel(channel.id);
      });  
      this.unsubscribe.push(subsChannel); 
         
    }    

    private setChannel(channelId) {
      this.userChannel.channelId = channelId;
    }

    add() {
      this.userService.addChannel(this.userChannel)
      .subscribe(
        result => {
          this.loadGrid();
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        }
      );  
    }

    delete(channelId: number) {
      this.userChannel.channelId = channelId;

      this.userService.deleteChannel(this.userChannel)
      .subscribe(
        result => {
          this.loadGrid();
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        }
      );          
    }
  }