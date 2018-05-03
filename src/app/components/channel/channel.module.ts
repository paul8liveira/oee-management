import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AgGridModule} from "ag-grid-angular/main";
import { SharedModule } from '../shared/shared.module';
import { ChannelService } from '../../services/channel/channel.service';
import { ChannelComponent } from './channel.component';
import { DropdownStatusModule } from '../dropdown/status/dropdown.status.module';

import { NumberOnlyDirective } from '../../directives/number.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownStatusModule,
    AgGridModule.withComponents([])     
  ],
  declarations: [ 
    NumberOnlyDirective,
    ChannelComponent,    
  ],
  exports: [ ChannelComponent ],
  providers: [ ChannelService ],  
})
export class ChannelModule { }