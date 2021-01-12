import { Component, ViewContainerRef } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { FilterService } from "../../../services/dashboard/filter.service";

@Component({
  selector: "app-date",
  template: `
    <input
      class="form-control"
      [style.width]="'100px'"
      placeholder="Dia"
      [(ngModel)]="date"
      [selectMode]="'single'"
      [owlDateTimeTrigger]="dt"
      [owlDateTime]="dt"
      (dateTimeChange)="changeDate($event)"
      #dateTimeRangeValidation="ngModel"
    />
    <owl-date-time pickerType="calendar" #dt></owl-date-time>
  `,
})
export class DateComponent {
  public date: Date;

  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {}

  changeDate(date: any) {
    this.filterService.setDateFilter(date.value);
  }
}
