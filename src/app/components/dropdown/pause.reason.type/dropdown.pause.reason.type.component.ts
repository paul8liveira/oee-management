import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'dropdown-pause-reason-type',  
  templateUrl: './dropdown-pause-reason-type.html'
})
export class DropdownPauseReasonComponent implements OnInit {
  items: Array<any> = [];
  selectedType: any;  
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
        id: 'NP',
        name: 'Não Programada',
      },
      {
        id: 'PP',
        name: 'Programada',
      },      
    ];    
    this.refreshValue(this.items[0]);
  }

  public refreshValue(value:any) {
    this.selectedType = value.id;    
    this.changeEvent.emit(this.selectedType);
  }  
}