import { Injectable } from '@angular/core';
import { ServiceBase } from "app/services/service.base";
import { Organizador } from "app/models/organizador";
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Http } from "@angular/http";

@Injectable()
export class OrganizadorService extends ServiceBase {
    
    constructor(private http: Http){ super(); }

    registrarOrganizador(organizador: Organizador) : Observable<Organizador> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let response = this.http
            .post(this.UrlServiceV1 + "nova-conta", organizador, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
    }

    login(organizador: Organizador): Observable<Organizador> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let response = this.http
            .post(this.UrlServiceV1 + "conta ", organizador, options)
            .map(super.extractData)
            .catch((super.serviceError));
        return response;
    };
}