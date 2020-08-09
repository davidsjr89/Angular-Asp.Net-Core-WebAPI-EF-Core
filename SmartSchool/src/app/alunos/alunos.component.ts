import { Component, OnInit, TemplateRef } from '@angular/core';
import { Aluno } from '../models/aluno';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  modalRef: BsModalRef;
  alunoForm: FormGroup;
  titulo = 'Alunos';
  alunoSelecionado: Aluno;
  alunos = [
   { id: 1, nome: 'Marta', sobrenome: 'Kent', telefone: 332255 },
   { id: 2, nome: 'Paula', sobrenome: 'Isabela', telefone: 33464654 },
   { id: 3, nome: 'Laura', sobrenome: 'Antonia', telefone: 45641328 },
   { id: 4, nome: 'Luiza', sobrenome: 'Maria', telefone: 168123198 },
   { id: 5, nome: 'Lucas', sobrenome: 'Machado', telefone: 198231498 },
   { id: 6, nome: 'Pedro', sobrenome: 'Alvares', telefone: 891323248 },
   { id: 7, nome: 'Paulo', sobrenome: 'José', telefone: 891321896 }
  ];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.criarForm();
   }

  ngOnInit(): void {
  }

  criarForm(){
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSelect(aluno: Aluno){
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  alunoSubmit(){
    console.log(this.alunoForm.value);
  }

  voltar(){
    this.alunoSelecionado = null;
  }

}
