import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphProductComponent } from './graph.product.component';
import { SharedModule } from '../shared/shared.module';

import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { DashboardService } from '../../services/dashboard/dashboard.service';

import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { ProductModalComponent } from './product.modal.component';
import { DropdownPauseReasonModule } from '../dropdown/pause.reason/dropdown.pause.reason.module';
import { DateRangeModule } from '../dropdown/dateRange/date.range.module';
import { DropdownProductModule } from '../dropdown/product/dropdown.product.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AmChartsModule,
    DropdownChannelModule,
    DropdownMachineModule,
    DropdownPauseReasonModule,
    DateRangeModule,
    DropdownProductModule
  ],
  declarations: [ 
    GraphProductComponent,    
    ProductModalComponent
  ],
  exports: [ GraphProductComponent ],
  providers: [ 
    DashboardService,
  ],
  entryComponents: [
    ProductModalComponent
  ],   
})
export class GraphProductModule { }
