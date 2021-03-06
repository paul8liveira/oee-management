import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserChannelModalComponent } from "../modal/userchannel.modal.component";
import { ChangePassModalComponent } from "../modal/changepass.modal.component";

@Component({
    selector: 'user-grid-buttons',
    template: `
    <div class="btn-group btn-group-sm" role="group" aria-label="Canais do usuário">
        <button type="button" class="btn btn-outline-secondary" (click)="userChannelModal()" title="Canais do usuário">
            <fa name="rss"></fa>
        </button>
        <button type="button" class="btn btn-outline-secondary" (click)="changePassModal()" title="Trocar senha">
            <fa name="key"></fa>
        </button>        
    </div>      
    `,
})
export class UserChannelButtonRenderer implements ICellRendererAngularComp {
    public params: any;
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}

    agInit(params: any): void {
        this.params = params;
    }

    public userChannelModal() {
        //exemplo de como acionar um metodo do componente pai
        //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`);

        const initialState = {
            userId: this.params.data.id,
            title: 'Canais do usuário - ' + this.params.data.username
        };
        this.bsModalRef = this.modalService.show(UserChannelModalComponent, {initialState});
        //preenchendo variavel da modal
        //this.bsModalRef.content.closeBtnName = 'Fechar';
    }

    public changePassModal() {
        const initialState = {
            userId: this.params.data.id,
            title: 'Alterar senha - ' + this.params.data.username
        };
        this.bsModalRef = this.modalService.show(ChangePassModalComponent, {initialState});
    }    

    refresh(): boolean {
        return false;
    }
}