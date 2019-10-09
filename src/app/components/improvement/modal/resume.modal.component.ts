import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResumeImprovement } from "../../../models/resume.improvement";
import { ResumeService } from "../../../services/improvement/resume.service";

 
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
        *ngIf="resume | async; else loading" [formGroup]="form"
          (ngSubmit)="form.valid && confirm($event)">

            <input 
              id="resume_id" 
              formControlName="resume_id"
              type="hidden"/>
          
          <div class="form-row">                
                <div class="form-group col-md-6">
                  <label for="resume_date">Data do resumo</label>
                  <input 
                      id="resume_date"
                      formControlName="resume_date"
                      type="date"
                      class="form-control"
                      required autofocus/>
                </div>

                <div class="form-group col-md-6">
                    <label for="status">Situação</label>
                    <dropdown-improvement-status (changeEvent)="setStatus($event)"></dropdown-improvement-status>
                </div>
          </div>
          
          <div class="form-row">          
              <div class="form-group col-md-12">
                  <label for="owner">Responsáveis</label>
                  <input 
                      id="owner" 
                      formControlName="owner"
                      type="text" 
                      class="form-control" 
                      required autofocus/>                      
              </div>  
          </div>

          <div class="form-row">
              <div class="form-group col-md-12">
                  <label for="action">Ações</label>
                  <textarea
                      id="action"
                      formControlName="action"
                      rows="3"
                      class="form-control"
                      required autofocus>
                  </textarea>
              </div>
          </div>

          <div class="form-row">
              <div class="form-group col-md-12">
                  <label for="overview">Análise</label>
                  <textarea 
                      id="overview" 
                      formControlName="overview"
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
   
  export class ResumeModalComponent implements OnInit {
    title: string;
    resume_id: number;
    statusAlt: number;
    form: FormGroup;
    resume: Observable<ResumeImprovement>;
    resume_update: ResumeImprovement = new ResumeImprovement ();
    
    constructor(
      public bsModalRef: BsModalRef,
      private resumeService: ResumeService,
      public toastr: ToastsManager,
      private formBuilder: FormBuilder,
      vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
      this.form = this.formBuilder.group({
        resume_id:  [this.resume_id],
        overview: ['', Validators.required],
        action: ['', Validators.required],        
        owner: ['', Validators.required],
        status: ['Não Iniciado', Validators.required],
        resume_date: [, Validators.required],
      });
      
      this.resume = this.resumeService.list(this.resume_id)
      .pipe( 
          tap(resume => this.form.patchValue(resume))
      );
      
    }
    
    setStatus($event) {
      this.statusAlt = $event;      
    }
    
    confirm(event) {
      event.preventDefault();
      
      this.resume_update.resume_id = this.form.value.resume_id
      this.resume_update.resume_date = this.form.value.resume_date
      this.resume_update.overview = this.form.value.overview
      this.resume_update.owner = this.form.value.owner
      this.resume_update.action = this.form.value.action      
      this.resume_update.status = this.statusAlt

      this.resumeService.update(this.resume_update)
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