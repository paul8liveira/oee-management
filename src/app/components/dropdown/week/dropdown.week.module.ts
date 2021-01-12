import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { DropdownWeekComponent } from "./dropdown.week.component";

@NgModule({
  imports: [CommonModule, FormsModule, NgSelectModule],
  declarations: [DropdownWeekComponent],
  exports: [DropdownWeekComponent],
})
export class DropdownWeekModule {}
