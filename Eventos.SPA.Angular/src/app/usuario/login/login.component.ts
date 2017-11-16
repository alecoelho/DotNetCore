import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CustomValidators } from "ng2-validation";

import { ToastsManager, Toast } from "ng2-toastr/ng2-toastr";
import { Organizador } from "app/models/organizador";
import { GenericValidator } from "app/utils/generic.form.validator";
import { OrganizadorService } from "app/services/organizador.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public errors: any[] = [];
  loginForm: FormGroup;
  organizador: Organizador;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private organizadorService: OrganizadorService,
    private router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.organizador = new Organizador();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.displayMessage = this.genericValidator.processMessages(this.loginForm);

    if (this.loginForm.dirty && this.loginForm.valid) {
      let p = Object.assign({}, this.organizador, this.loginForm.value);

      this.organizadorService.login(p)
        .subscribe(
        result => { this.onLoginComplete(result) },
        error => { this.onLoginError(error) });
    }
  }

  onLoginError(error: any): void {
    this.errors = JSON.parse(error._body).errors;
    this.toastr.error('Falhar ao realizar o Login!', 'Ops :(')
  }

  onLoginComplete(response: any): void {
    this.loginForm.reset();
    this.errors = [];

    localStorage.setItem('eio.token', response.result.access_token);
    localStorage.setItem('eio.user', JSON.stringify(response.result.user));

    this.toastr.success('Login efetuado com Sucesso!', 'Bem vindo!!!', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/proximos-eventos']);
        }, 3500);
      }); 
  }
}
