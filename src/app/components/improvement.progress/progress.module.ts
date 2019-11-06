import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';
import { ActionService } from '../../services/improvement/action.service';
import { ProgressService } from '../../services/improvement/progress.service';
import { ProgressComponent } from './progress.component';
import { DropdownImprovementStatusModule } from '../dropdown/improvement.status/dropdown.improvement.status.module';
import { DropdownPauseReasonModule } from '../dropdown/pause.reason/dropdown.pause.reason.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressModalComponent } from './modal/progress.modal.component';
import { ProgressImprovementGridButtonRenderer } from './grid/progress.grid.buttons.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    AgGridModule.withComponents([ ProgressImprovementGridButtonRenderer ]),
    DropdownImprovementStatusModule,
    DropdownPauseReasonModule,
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
  ],
  declarations: [
    ProgressComponent,
    ProgressModalComponent,
    ProgressImprovementGridButtonRenderer,
  ],
  exports: [ 
    ProgressComponent,
  ],
  providers: [
    ProgressService,
  ],
   entryComponents: [
    ProgressModalComponent,
  ],     
})
export class ProgressModule { }
