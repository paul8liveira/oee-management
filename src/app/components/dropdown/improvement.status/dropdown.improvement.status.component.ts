import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'dropdown-improvement-status',  
  templateUrl: './dropdown.improvement.status.html'
})
export class DropdownImprovementStatusComponent implements OnInit {
  items: Array<any> = [];
  selectedStatus: any;
  @Output() changeEvent = new EventEmitter<number>();

  constructor(
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {  
    this.load();     
  }

  load() {
    this.items = [      
      {
        id: 0,
        name: 'Não Iniciado',
      },
      {
        id: 1,
        name: 'Em Andamento',
      },
      {
        id: 2,
        name: 'Finalizado',
      },
    ];    
    this.refreshValue(this.items[0]);
  }

  public refreshValue(value:any) {
    this.selectedStatus = value.id
    this.changeEvent.emit(this.selectedStatus);
  }  
}