import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from "rxjs/operators";
import { MensagemService } from '../shared/services/mensagem.service';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

  constructor(private mensagemService: MensagemService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(resposta=>this.trataRespostaErro(resposta))
    );
  }

  private trataRespostaErro(resposta: object): Observable<HttpEvent<any>>{
    if (resposta instanceof HttpErrorResponse){
      this.mensagemService.snackErro("Não houve a conexão com o servidor");
    }
    return throwError(resposta);
  }
}
