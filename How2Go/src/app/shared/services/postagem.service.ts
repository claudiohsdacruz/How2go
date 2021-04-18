import { Injectable } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import {POSTAGENS} from '../../shared/model/POSTAGENS';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  postagens: Array<Postagem>;

  constructor() { 
    this.postagens = POSTAGENS;
  }

  listar(): Array<Postagem> {
    return this.postagens;
  }

  inserir(postagem: Postagem): void {
    if(postagem.foto == undefined) {
      postagem.foto = [];
    }
    this.postagens.push(postagem);
  }

  remover(postagem: Postagem): void {
    const indxPostagemARemover = this.postagens.findIndex(p => p.id === postagem.id)
    if (indxPostagemARemover > -1) {
      this.postagens.splice(indxPostagemARemover, 1);
    }   
  }

  inserirComentario(postagem: Postagem, comentario: string ): void {
    postagem.comentarios.push(['Autor 1', comentario]);
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
