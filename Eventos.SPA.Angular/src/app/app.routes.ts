import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { InscricaoComponent } from "app/usuario/inscricao/inscricao.component";
import { LoginComponent } from "app/usuario/login/login.component";
import { AdicionarEventoComponent } from "app/eventos/adicionar-evento/adicionar-evento.component";
import { AuthService } from "app/services/auth.service";

export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent },
    {path: 'proximos-eventos', component: ListaEventosComponent },
    {path: 'inscricao', component: InscricaoComponent },
    {path: 'login', component: LoginComponent },
    {path: 'novo-evento', canActivate: [AuthService], component: AdicionarEventoComponent }
]