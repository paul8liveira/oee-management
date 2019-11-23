import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { ProgressImprovement } from '../../models/progress.improvement';
import { ProgressService } from '../../services/improvement/progress.service';
import { ProgressImprovementGridButtonRenderer } from './grid/progress.grid.buttons.component';

@Component({
  selector: 'app-improvement-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent extends BaseComponent implements OnInit {
  progress: ProgressImprovement = new ProgressImprovement();
  currentChannel;
  statusMappings = {
    0: "Não Iniciado",
    1: "Em Andamento",
    2: "Finalizado",
  };
  gridApi;
  gridColumnApi;
  columnDefs;
  columnProgress;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  context;
  frameworkComponents;
  currentUser;
  statusInclud :number;
  pauseInclud : number;
  components;

  constructor(private progressService: ProgressService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.currentUser = this.getCurrentUser();
    this.currentChannel = localStorage.getItem('channelId');
    this.toastr.setRootViewContainerRef(vcr);
    this.columnDefs  = [
      {
        headerName: "id",
        field: "progress_id",
        hide: true,
      },      
      {
        headerName: "Pausa",
        field: "pause_reason_id",
        hide: true,
      },
      {
        headerName: "Item",
        field: "pause_name",
      },
      {
        headerName: "Ganho",
        field: "gain",
        editable: true,
        cellEditor: "agLargeTextCellEditor",
      },
      {
        headerName: "Descrição",
        field: "description",
        editable: true,
        cellEditor: "agLargeTextCellEditor",
      },
      {
        headerName: "Descrição da ação",
        field: "action_description",
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
      },
      {
        headerName: "Início",
        field: "starts_at",
        editable: true,
        cellEditor: "datePicker",
      },
      {
        headerName: "Fim",
        field: "finished_at",
        editable: true,
        cellEditor: "datePicker",
      },
      {
        headerName: "Op.",
        cellRenderer: "progressImprovementGridButtonRenderer",
        colId: "params",
        width: 110,
      },
    ];
    
    this.context = { componentParent: this };
    this.components = { datePicker: this.getDatePicker() };
    this.frameworkComponents = {
      progressImprovementGridButtonRenderer: ProgressImprovementGridButtonRenderer
    };
  }

  ngOnInit() {
  }
  
  setStatus($event) {
    this.statusInclud = $event;
  }

  setPause($event) {
    this.pauseInclud = $event.id;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    this.progressService.listByChannel()
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
    
    this.progress.channel_id = this.currentChannel
    this.progress.status = this.statusInclud
    this.progress.pause_reason_id = this.pauseInclud

    this.progressService.add(this.progress)
    .subscribe(
      result => {
        const progress : ProgressImprovement = {           
           channel_id : result.channel_id,
           pause_reason_id : result.pause_reason_id,
           pause_name : result.pause_name,
           gain : result.gain,
           description : result.description,
           action_description : result.action_description,
           owner : result.owner,        
           status : result.status,
           starts_at : result.starts_at,
           finished_at : result.finished_at,
           created_at : result.created_at
        };
        this.gridApi.updateRowData({ add: [progress] });
        
        this.progress = new ProgressImprovement();
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );    
  }

  update(data) {
    this.progressService.update(data)
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
        this.progressService.delete(row)
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
