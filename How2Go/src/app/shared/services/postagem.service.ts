import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Postagem} from '../../shared/model/postagem';


@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  URL_POSTAGENS = 'http://localhost:3000/postagens';

  constructor(private httpClient : HttpClient) { 
  }

  listar(): Observable<Postagem[]> {
    return this.httpClient.get<Postagem[]>(this.URL_POSTAGENS);
  }

  inserir(postagem: Postagem): Observable<Postagem> {
    return this.httpClient.post<Postagem>(this.URL_POSTAGENS, postagem);
  }

  // remover(postagem: Postagem): void {
  //   const indxPostagemARemover = this.postagens.findIndex(p => p.id === postagem.id)
  //   if (indxPostagemARemover > -1) {
  //     this.postagens.splice(indxPostagemARemover, 1);
  //   }   
  // }

  inserirComentario(postagem:Postagem,comentario:string): Observable<Postagem>{
    postagem.comentarios.push(['Autor 1',comentario]);
    return this.httpClient.put<Postagem>(`${this.URL_POSTAGENS}/${postagem.id}`,postagem)
  }

  clickLike(postagem: Postagem): number {
    if(postagem.like==0) {
      postagem.like+=1;
    }
    else {
      postagem.like-=1;
    }
    return postagem.like;
  }
 
}
