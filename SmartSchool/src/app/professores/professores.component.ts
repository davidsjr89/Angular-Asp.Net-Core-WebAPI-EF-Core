import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Professor } from './../models/Professor';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  modalRef: BsModalRef;
  professorForm: FormGroup;
  titulo = 'Professores';
  professorSelecionado: Professor;
  professores = [
   {id: 1, nome: 'Lauro', disciplina: 'Matemática'},
   {id: 2, nome: 'Roberto', disciplina: 'Física'},
   {id: 3, nome: 'Ronaldo', disciplina: 'Português'},
   {id: 4, nome: 'Rodrigo', disciplina: 'Inglês'},
   {id: 5, nome: 'Alexandre', disciplina: 'Programação'}
  ];
  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  }

  criarForm(){
    this.professorForm = this.fb.group({
      nome: ['', Validators.required],
      disciplina: ['', Validators.required]
    });
  }
  professorSubmit(){

  }

  professorSelect(prof: Professor){
    this.professorSelecionado = prof;
    this.professorForm.patchValue(prof);
  }
  voltar(){
    this.professorSelecionado = null;
  }
}
