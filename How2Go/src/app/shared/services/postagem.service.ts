import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber} from 'rxjs';
import {Postagem} from '../../shared/model/postagem';
import { usuarioLogado } from '../model/usuario_logado';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  fotos: Array<string>;
  URL_POSTAGENS = 'http://localhost:8080/postagens/';
  usuario_logado = usuarioLogado;
  
  constructor(private httpClient : HttpClient, private usuarioService : UsuarioService) { 
  }

  listar(): Observable<Postagem[]> {
    return this.httpClient.get<Postagem[]>(this.URL_POSTAGENS);
  }


  inserir(postagem: Postagem): Observable<Postagem> {
    if(postagem.fotos==undefined) {
      postagem.fotos=[]
    }
    postagem.comentarios = [];
    this.usuarioService.listar().subscribe(
      usuarios => {for(let usuario of usuarios) {
        if(usuario.email==this.usuario_logado[0].email) {
          usuario.postagens.push(postagem)
          this.usuarioService.atualizar(usuario);
          postagem.usuario = usuario;
        }
      }
      }
    )
    return this.httpClient.post<Postagem>(this.URL_POSTAGENS, postagem);   
  }

  remover(id:number): Observable<object>{
    return this.httpClient.delete(`${this.URL_POSTAGENS}${id}`);
  }

  inserirComentario(postagem:Postagem,comentario:string): Observable<Postagem>{
    postagem.comentarios.push(this.usuario_logado[0].nome);
    postagem.comentarios.push(comentario);
    return this.httpClient.put<Postagem>(`${this.URL_POSTAGENS}`,postagem)
  }

  clickLike(postagem: Postagem): number {
    if(postagem.like==0) {
      postagem.like+=1;
    }
    else{
      postagem.like-=1;
    }
    return postagem.like;
  }
 
   //-----------------------------------UPLOAD FOTOS-----------------------------------
   onChange($event:Event):Array<string>{
    this.fotos=[];
    const file =($event.target as HTMLInputElement).files;
    for (let i=0;i<file.length;i++){
      this.convertToBase64(file[i]);
    }
    return this.fotos;
  }
  convertToBase64(file:File){
    const observable = new Observable((subscriber:Subscriber<any>)=>{
      this.readFile(file,subscriber)
    });
    observable.subscribe((d)=>{
      this.fotos.push(d);
    })
  }
  readFile(file:File, subscriber:Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload=()=>{
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror=(error)=>{
      subscriber.error(error);
      subscriber.complete();
    }
  }
}
