import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { FilterService } from '../../../services/dashboard/filter.service';
import { DWMY } from '../../../utils/enums/dwmy.enum';
 
@Component({
  selector: 'dropdown-dwmy',  
  templateUrl: './dropdown-dwmy.html'
})
export class DropdownDWMYComponent implements OnInit {
  items: Array<any> = [
    {
      id: DWMY.DIA_ANTERIOR,
      name: 'Dia anterior',
    },      
    {
      id: DWMY.DIA_ATUAL,
      name: 'Dia atual',
    },      
    {
      id: DWMY.SETE_DIAS,
      name: '7 dias atrás',
    },
    {
      id: DWMY.MES_ATUAL,
      name: 'Mês atual',
    }, 
    {
      id: DWMY.ANO_ATUAL,
      name: 'Ano atual',
    },
  ];
  selectedFilter: number;

  constructor(
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {
    this.toastr.setRootViewContainerRef(vcr);            
    
    //sempre vai selecionar inicialmente o valor Dia atual
    this.selectedFilter = this.items[1].id;    
  }

  ngOnInit() {       
    this.filterService.setDWMyFilter(this.selectedFilter);
  }

  public refreshValue(value:any) {
    this.selectedFilter = value.id;    
    this.filterService.setDWMyFilter(value.id);
  }
}