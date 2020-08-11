import { AlunoService } from './../service/aluno.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Aluno } from '../models/Aluno';

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
  alunos: Aluno[];
  modo = 'post';
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder, private modalService: BsModalService, private alunosService: AlunoService) {
    this.criarForm();
   }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(){
    this.alunosService.getAll().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos;
      },
      (erro: any) => {
        console.error(erro);
      }
      );
  }

  criarForm(){
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSelect(aluno: Aluno){
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  alunoNovo(){
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

  alunoSubmit(){
    this.salvarAluno(this.alunoForm.value);
  }

  salvarAluno(aluno: Aluno){
    (aluno.id !== 0) ? this.modo = 'put' : this.modo = 'post';
    this.alunosService[this.modo](aluno).subscribe(
      (model: Aluno) => {
        console.log(model);
        this.carregarAlunos();
        this.alunoNovo();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }
  deletarAluno(id: number){
    console.log(id);
    this.alunosService.delete(id).subscribe(
      (model: any) => {
        console.log(model);
        this.carregarAlunos();
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  voltar(){
    this.alunoSelecionado = null;
  }

}
