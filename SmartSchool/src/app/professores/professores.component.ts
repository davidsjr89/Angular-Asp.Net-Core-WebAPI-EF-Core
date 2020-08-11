import { ProfessorService } from './../service/professor.service';
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
  professores: Professor[];
  modo = 'post';
  constructor(private fb: FormBuilder, private modalService: BsModalService, private professorService: ProfessorService) {
    this.criarForm();
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.carregarProfessor();
  }

  carregarProfessor(){
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (error: any) => {
        console.log(error);
      },
    );
  }

  criarForm(){
    this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required]
    });
  }
  professorSubmit(){
    this.salvarProfessor(this.professorForm.value);
  }

  salvarProfessor(professor: Professor){
    (professor.id === 0) ? this.modo = 'post' : this.modo = 'put';
    this.professorService[this.modo](professor).subscribe(
      (retorno: Professor) => {
        console.log(retorno);
        this.carregarProfessor();
        this.professorNovo();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  professorSelect(prof: Professor){
    this.professorSelecionado = prof;
    this.professorForm.patchValue(prof);
  }

  professorNovo(){
    this.professorSelecionado = new Professor();
    this.professorForm.patchValue(this.professorSelecionado);
  }

  voltar(){
    this.professorSelecionado = null;
  }
}
