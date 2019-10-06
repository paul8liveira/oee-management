import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ResumeModalComponent } from "../modal/resume.modal.component";

@Component({
    selector: 'resume-improvement-grid-buttons',
    template: `
    <div class="btn-group btn-group-sm" role="group">
        
        <button type="button" class="btn btn-outline-secondary" (click)="resumeImprovementModal()" title="Editar resumo">
            <fa name="edit"></fa>
        </button> 
    
    </div>      
    `,
})

export class ResumeImprovementGridButtonRenderer implements ICellRendererAngularComp {
    public params: any;
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}

    agInit(params: any): void {
        this.params = params;
        
        switch(this.params.data.month) {
            case 1:  this.params.data.name = "Janeiro"; break;
            case 2 : this.params.data.name = "Fevereiro"; break;
            case 3 : this.params.data.name = "Março"; break;
            case 4 : this.params.data.name = "Abril"; break;
            case 5 : this.params.data.name = "Maio"; break;
            case 6 : this.params.data.name = "Junho"; break;
            case 7 : this.params.data.name = "Julho"; break;
            case 8 : this.params.data.name = "Agosto"; break;
            case 9 : this.params.data.name = "Setembro"; break;
            case 10 : this.params.data.name = "Outubro"; break;
            case 11 : this.params.data.name = "Novembro"; break;
            case 12 : this.params.data.name = "Desembro"; break;
            default: this.params.data.name = this.params.data.month              
        }        
    }

    public resumeImprovementModal() {
        const initialState = {
            resume_id : this.params.data.resume_id,
            title : 'Editando resumo de ' + this.params.data.name
        };
        this.bsModalRef = this.modalService.show(ResumeModalComponent, {initialState});
    }

    refresh(): boolean {
        return false;
    }
}