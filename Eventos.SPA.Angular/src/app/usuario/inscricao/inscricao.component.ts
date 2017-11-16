import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { Organizador } from "app/models/organizador";
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from "@angular/forms";
import { Router } from "@angular/router";

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { GenericValidator } from "app/utils/generic.form.validator";
import { OrganizadorService } from "app/services/organizador.service";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ToastsManager, Toast } from "ng2-toastr/ng2-toastr";


@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  organizador: Organizador;
  public errors: any[] = [];
  displayMessage: { [key: string]: string } = {};
  validationMessages: { [key: string]: { [key: string]: string } };
  inscricaoForm: FormGroup;
  genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private organizadorService: OrganizadorService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private router: Router) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        rangeLength: 'CPF deve conter 11 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir no mínimo 6 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.organizador = new Organizador();
  }

  ngOnInit() {

    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.inscricaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(2)]],
      cpf: ['', [Validators.required, CustomValidators.rangeLength([11, 11])]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(...controlBlurs).debounceTime(500).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);
    });
  }

  adicionarOrganizador() {
    //this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm)
    if (this.inscricaoForm.dirty && this.inscricaoForm.valid) {
      let o = Object.assign({}, this.organizador, this.inscricaoForm.value)

      this.organizadorService.registrarOrganizador(o)
        .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) }
        )
    }
  }

  onSaveComplete(response: any) {
    this.inscricaoForm.reset();
    this.errors = [];

    localStorage.setItem('eio.token', response.result.access_token);
    localStorage.setItem('eio.user', JSON.stringify(response.result.user));

    this.toastr.success('Registro realizado com sucesso!','Bem vindo!!!', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/home']);
        }, 3500);
      });
  } 

  onSaveError(error: any) {
    this.errors = JSON.parse(error._body).errors;
    this.toastr.error('Falhar ao realizar o cadastro!', 'Ops :(')
  }
}
