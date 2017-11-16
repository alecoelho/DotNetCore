import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GenericValidator } from "app/utils/generic.form.validator";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { Toast } from "ng2-toastr/src/toast";

@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.component.html',
  styleUrls: ['./adicionar-evento.component.css']
})
export class AdicionarEventoComponent implements OnInit {
 //private myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  eventoForm: FormGroup;
 // evento: Evento;
  //categorias: Categoria[];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    //private eventoService: EventoService,
    private router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      dataInicio: {
        required: 'Informe a data de início'
      },
      dataFim: {
        required: 'Informe a data de encerramento'
      },
      categoriaId: {
        required: 'Informe a categoria'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    //this.evento = new Evento();
    //this.evento.endereco = new Endereco();
  }

  ngOnInit() {
    this.eventoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      categoriaId: ['', Validators.required],
      descricaoCurta: '',
      descricaoLonga: '',
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      gratuito: '',
      valor: '0',
      online: '',
      nomeEmpresa: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
    });

   /* this.eventoService.obterCategorias()
      .subscribe(categorias => this.categorias = categorias,
      error => this.errors);*/
  }

  adicionarEvento() {
    this.displayMessage = this.genericValidator.processMessages(this.eventoForm);

    if (this.eventoForm.dirty && this.eventoForm.valid) {
     /* let user = this.eventoService.obterUsuario();

      let p = Object.assign({}, this.evento, this.eventoForm.value);
      p.organizadorId = user.id;
      p.dataInicio = DateUtils.getMyDatePickerDate(p.dataInicio);
      p.dataFim = DateUtils.getMyDatePickerDate(p.dataFim);
      p.endereco.logradouro = p.logradouro;
      p.endereco.numero = p.numero;
      p.endereco.complemento = p.complemento;
      p.endereco.bairro = p.bairro;
      p.endereco.cep = p.cep;
      p.endereco.cidade = p.cidade;
      p.endereco.estado = p.estado;

      this.eventoService.registrarEvento(p)
        .subscribe(
        result => { this.onSaveComplete() },
        error => { this.onError(error) });*/
    }
  }

  onError(error) {
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
    this.errors = JSON.parse(error._body).errors;
  }

  onSaveComplete(): void {
    this.eventoForm.reset();
    this.errors = [];

    this.toastr.success('Evento Registrado com Sucesso!', 'Oba :D', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigateByUrl('/eventos');
        }, 2500);
      });
  }
}
