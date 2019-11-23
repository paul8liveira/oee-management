import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { ResumeImprovement } from '../../models/resume.improvement';
import { ResumeService } from '../../services/improvement/resume.service';
import { ResumeImprovementGridButtonRenderer } from './grid/resume.grid.buttons.component';

@Component({
  selector: 'app-improvement-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent extends BaseComponent implements OnInit {
  resume: ResumeImprovement = new ResumeImprovement();
  dropdownChannel;  
  statusMappings = {
    0: "Não Iniciado",
    1: "Em Andamento",
    2: "Finalizado",
  };
  monthMapping ={
    1 : "Janeiro",
    2 : "Fevereiro",
    3 : "Março",
    4 : "Abril",
    5 : "Maio",
    6 : "Junho",
    7 : "Julho",
    8 : "Agosto",
    9 : "Setembro",
    10 : "Outubro",
    11 : "Novembro",
    12 : "Desembro",
  };
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  context;
  frameworkComponents;
  currentUser;
  statusInclud :number;

  constructor(private resumeService: ResumeService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.currentUser = this.getCurrentUser();
    this.dropdownChannel = localStorage.getItem('channelId');
    this.toastr.setRootViewContainerRef(vcr);
    this.columnDefs = [      
      {
        headerName: "id",
        field: "resume_id",
        hide: true,
      },
      {
        headerName: "Mês",
        field: "month",
        editable: false,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.monthMapping) },
        refData: this.monthMapping,
        width: 100,
      },
      {
        headerName: "Análise",
        field: "overview",
        editable: true,
        cellEditor: "agLargeTextCellEditor",
      },
      {
        headerName: "Ações",
        field: "action",
        editable: true,
        cellEditor: "agLargeTextCellEditor",
      },
      {
        headerName: "Responsáveis",
        field: "owner",
        editable: true,
      },
      {
        headerName: "Situação",
        field: "status",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.statusMappings) },
        refData: this.statusMappings,
        width: 100,
      },
      {
        headerName: "Data",
        field: "resume_date",
        editable: false,
        hide: true,        
      },
      {
        headerName: "Op.",
        cellRenderer: "resumeImprovementGridButtonRenderer",
        colId: "params",
        width: 50,
      },
    ];

    this.context = { componentParent: this };
    this.frameworkComponents = {
      resumeImprovementGridButtonRenderer: ResumeImprovementGridButtonRenderer
    };
  }

  ngOnInit() {
  }
  
  setStatus($event) {
    this.statusInclud = $event;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.resumeService.listAll()
    .subscribe(
      result => {
        params.api.setRowData(result);
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }); 
    params.api.sizeColumnsToFit();   
  }

  onCellValueChanged(event) {
    this.update(event.data);
  } 

  add(event) {
    event.preventDefault();
    
    this.resume.channel_id = this.dropdownChannel
    this.resume.status = this.statusInclud
    
    this.resumeService.add(this.resume)
    .subscribe(
      result => {
        const resume : ResumeImprovement = {
           resume_id : result.resume_id,
           channel_id : result.channel_id,
           overview : result.overview,
           action : result.action,
           owner : result.owner,
           status : result.status,
           resume_date : result.resume_date,
           created_at : result.created_at
        };
        this.gridApi.updateRowData({ add: [resume] });
        
        this.resume = new ResumeImprovement();
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );    
  }

  update(data) {
    this.resumeService.update(data)
    .subscribe(
      result => {},
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );    
  }

  delete() {
    let selectedData = this.gridApi.getSelectedRows();  
    
    if(selectedData.length > 0) {
      selectedData.forEach(row => {
        this.resumeService.delete(row)
        .subscribe(
          result => {
            this.gridApi.updateRowData({ remove: [row] });
          },
          error => {
            this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
          }
        );         
      });      
    }
  }

}
