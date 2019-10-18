import { Component, ViewContainerRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
 
@Component({
  selector: 'dropdown-improvement-priority',  
  templateUrl: './dropdown.improvement.priority.html'
})
export class DropdownImprovementPriorityComponent implements OnInit {
  items: Array<any> = [];
  selectedPriority: any;
  @Input() priority: number;
  @Output() changeEvent = new EventEmitter<number>();

  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {  
    this.load();
    if (this.priority !== undefined) {
      this.refreshValue(this.priority);
    }
  }

  load() {
    this.items = [      
      {
        id: 0,
        name: 'Baixa',
      },
      {
        id: 1,
        name: 'Média',
      },
      {
        id: 2,
        name: 'Alta',
      },
    ];    
    this.refreshValue(this.items[0]);
  }

  public refreshValue(value:any) {
    this.selectedPriority = value.id;    
    this.changeEvent.emit(this.selectedPriority);
  }  
}