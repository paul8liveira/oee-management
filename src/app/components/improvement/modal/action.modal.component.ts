import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActionImprovement } from "../../../models/action.improvement";
import { ActionService } from "../../../services/improvement/action.service";

 
@Component({
    selector: 'modal-content',
    template: `
    <div class="modal-header">
        <h5 class="modal-title pull-left">{{title}}</h5>
        <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <form  
        *ngIf="action | async; else loading" [formGroup]="form"
          (ngSubmit)="form.valid && confirm($event)">

            <input 
              id="action_id" 
              formControlName="action_id"
              type="hidden"/>
            <input 
              id="machine_code" 
              formControlName="machine_code"
              type="hidden"/>            
            <input 
              id="pause_reason_id" 
              formControlName="pause_reason_id"
              type="hidden"/>
              
          <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="starts_at">Inicío</label>
                  <input 
                      id="starts_at"
                      formControlName="starts_at"
                      type="date"
                      class="form-control"
                      required autofocus/>
                </div>
                <div class="form-group col-md-6">
                  <label for="finished_at">Fim</label>
                  <input 
                      id="finished_at"
                      formControlName="finished_at"
                      type="date"
                      class="form-control"
                      required autofocus/>
              </div>
          </div>

          <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="status">Situação</label>
                    <dropdown-improvement-status (changeEvent)="setStatus($event)"></dropdown-improvement-status>
                </div>

                <div class="form-group col-md-6">
                    <label for="priority">Prioridade</label>
                    <dropdown-improvement-priority id="priority" (changeEvent)="setPriority($event)" [priority]=priority ></dropdown-improvement-priority>
                </div>
          </div>

          <div class="form-row">          
              <div class="form-group col-md-6">
                  <label for="owner">Responsáveis</label>
                  <input 
                      id="owner" 
                      formControlName="owner"
                      type="text" 
                      class="form-control" 
                      required autofocus/>                      
              </div>
              <div class="form-group col-md-6">
                  <label for="gain">Ganho</label>
                  <input 
                      id="gain" 
                      formControlName="gain"
                      type="text" 
                      class="form-control" 
                      required autofocus/>                      
              </div>
          </div>


          <div class="form-row">
              <div class="form-group col-md-12">
                  <label for="description">Descrição</label>
                  <textarea 
                      id="description" 
                      formControlName="description"
                      rows="3" 
                      class="form-control" 
                      required autofocus>
                  </textarea>
              </div>
          </div>
          <div class="form-row">
              <div class="form-group col-md-12">
                  <label for="detailing">Análise</label>
                  <textarea 
                      id="detailing" 
                      formControlName="detailing"
                      rows="5" 
                      class="form-control" 
                      required autofocus>
                  </textarea>
              </div>
          </div>
          <!--
          <button 
              type="submit" 
              class="btn btn-outline-primary" 
              [disabled]="!form.valid">Confirmar</button>            
          -->
        </form>
        <ng-template #loading>
            Carregando...
        </ng-template>        
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="bsModalRef.hide()">Fechar</button>
    </div>
`,
  })
   
  export class ActionModalComponent implements OnInit {
    title: string;
    action_id: number;
    statusAlt: number;
    priorityAlt: number;
    form: FormGroup;
    action: Observable<ActionImprovement>;
    action_update: ActionImprovement = new ActionImprovement ();
    
    constructor(
      public bsModalRef: BsModalRef,
      private actionService: ActionService,
      public toastr: ToastsManager,
      private formBuilder: FormBuilder,
      vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
      this.form = this.formBuilder.group({
        action_id :  [this.action_id],
        pause_reason_id : [''],
        status : ['', Validators.required],
        priority : ['', Validators.required],
        machine_code : ['', Validators.required],
        starts_at: [''],
        finished_at : [''],
        owner : [''],
        gain : [''],
        description : [''],
        detailing : [''],
      });
      
      this.action = this.actionService.list(this.action_id)
      .pipe( 
          tap(action => this.form.patchValue(action))
      );
      
    }
    
    setStatus($event) {
      this.statusAlt = $event;      
    }

    setPriority($event) {
      this.priorityAlt = $event;      
    }
    
    confirm(event) {
      event.preventDefault();
      
      this.action_update.action_id = this.form.value.action_id
      this.action_update.channel_id = this.form.value.channel_id
      this.action_update.pause_reason_id = this.form.value.pause_reason_id
      this.action_update.machine_code = this.form.value.machine_code
      
      this.action_update.priority = this.priorityAlt
      this.action_update.status = this.statusAlt

      this.action_update.owner = this.form.value.owner
      this.action_update.gain = this.form.value.gain
      this.action_update.description = this.form.value.description
      this.action_update.detailing = this.form.value.detailing      
      this.action_update.finished_at = this.form.value.finished_at
      this.action_update.starts_at = this.form.value.starts_at

      this.actionService.update(this.action_update)
      .subscribe(
        result => {
          this.toastr.success("Resumo Salvo!", "Sucesso!", { enableHTML: true, showCloseButton: true });
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        }
      );      
    }
  }