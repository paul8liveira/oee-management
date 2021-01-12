import { Component, Output, EventEmitter } from "@angular/core";
import { FilterService } from "../../../services/dashboard/filter.service";

@Component({
  selector: "app-dropdown-week",
  template: `
    <div class="row">
      <div class="col-md-4">
        <ng-select
          [items]="years"
          bindLabel="name"
          bindValue="id"
          placeholder="Ano"
          (add)="setYear($event)"
          [clearable]="false"
          [(ngModel)]="selectedYear"
        >
        </ng-select>
      </div>
      <div class="col-md-8">
        <ng-select
          [items]="weeks"
          bindLabel="name"
          bindValue="id"
          placeholder="Semana"
          (add)="setWeek($event)"
          [clearable]="false"
        >
        </ng-select>
      </div>
    </div>
  `,
})
export class DropdownWeekComponent {
  weeks: Array<{ id: number; name: string }> = [];
  years: Array<{ id: number; name: string }> = [];

  selectedYear = new Date().getFullYear();

  constructor(private filterService: FilterService) {
    for (let i = 0; i <= 52; i++) {
      this.weeks.push({
        id: i + 1,
        name: `Semana ${i + 1}`,
      });
    }

    for (let i = 2017; i <= 2030; i++) {
      this.years.push({
        id: i,
        name: i.toString(),
      });
    }
  }

  public setYear(value: any) {
    this.selectedYear = parseInt(value.id, 10);
  }
  public setWeek(value: any) {
    this.filterService.setWeekFilter(this.selectedYear, value.id);
  }
}
