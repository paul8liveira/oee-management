import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AgGridModule} from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';
import { AlertService } from '../../services/alert/alert.service';
import { AlertComponent } from './alert.component';
import { DropdownPauseReasonModule } from '../dropdown/pause.reason/dropdown.pause.reason.module';
import { DropdownSponsorModule } from '../dropdown/sponsor/dropdown.sponsor.module';
import { DropdownAlertPauseTimeModule } from '../dropdown/alertPauseTime/dropdown.alertPauseTime.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AgGridModule,
    DropdownPauseReasonModule,
    DropdownSponsorModule,
    DropdownAlertPauseTimeModule,
    DropdownMachineModule,
    DropdownChannelModule
  ],
  declarations: [
    AlertComponent
  ],
  exports: [ AlertComponent ],
  providers: [
    AlertService
  ],
   entryComponents: [
  ],
})
export class AlertModule { }
