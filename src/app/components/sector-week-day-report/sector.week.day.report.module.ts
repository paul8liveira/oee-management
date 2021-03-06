import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { MachineWeekDayReportService } from "../../services/machine.week.day.report.service";
import { SectorWeekDayReportComponent } from "./sector.week.day.report.component";
import { DropdownChannelModule } from "../dropdown/channel/dropdown.channel.module";
import { DropdownMachineModule } from "../dropdown/machine/dropdown.machine.module";
import { DateModule } from "../dropdown/date/date.module";
import { DropdownWeekModule } from "../dropdown/week/dropdown.week.module";
import { DropdownChannelSectorModule } from "../dropdown/channel-sector/dropdown.channel-sector.module";
import { SectorWeekDayBarChartComponent } from "./sector.week.day.bar.chart.component";
import { MachineWeekDayReportModule } from "../machine-week-day-report/machine.week.day.report.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownChannelModule,
    DropdownMachineModule,
    DateModule,
    DropdownWeekModule,
    DropdownChannelSectorModule,
    MachineWeekDayReportModule
  ],
  declarations: [SectorWeekDayReportComponent, SectorWeekDayBarChartComponent],
  exports: [SectorWeekDayReportComponent, SectorWeekDayBarChartComponent],
  providers: [MachineWeekDayReportService],
})
export class SectorWeekDayReportModule {}
