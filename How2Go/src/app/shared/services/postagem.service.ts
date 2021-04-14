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
    this.postagens.push(postagem);
  }
}
