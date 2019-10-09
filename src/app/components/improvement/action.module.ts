import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';
import { ActionService } from '../../services/improvement/action.service';
import { ActionComponent } from './action.component';

import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { DropdownPauseReasonModule } from '../dropdown/pause.reason/dropdown.pause.reason.module';
import { DropdownImprovementStatusModule } from '../dropdown/improvement.status/dropdown.improvement.status.module';
import { DropdownImprovementPriorityModule } from '../dropdown/improvement.priority/dropdown.improvement.priority.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ActionModalComponent } from './modal/action.modal.component';
import { ActionImprovementGridButtonRenderer } from './grid/action.grid.buttons.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AgGridModule,
    AgGridModule.withComponents([ ActionImprovementGridButtonRenderer ]),
    DropdownMachineModule,
    DropdownPauseReasonModule,
    DropdownImprovementStatusModule,
    DropdownImprovementPriorityModule,    
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
  ],
  declarations: [
    ActionComponent,
    ActionModalComponent,
    ActionImprovementGridButtonRenderer,
  ],
  exports: [ ActionComponent ],
  providers: [
    ActionService,
  ],
   entryComponents: [
    ActionModalComponent,
  ],     
})
export class ActionModule { }
