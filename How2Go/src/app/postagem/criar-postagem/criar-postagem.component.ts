import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import {POSTAGENS} from '../../shared/model/POSTAGENS';

@Component({
  selector: 'app-criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrls: ['./criar-postagem.component.scss']
})
export class CriarPostagemComponent implements OnInit {
  postagem: Postagem;
  postagens: Array<Postagem>;

  constructor() {
    this.postagem = new Postagem();
    this.postagens = POSTAGENS;
   }

  ngOnInit(): void {
  }

  inserirPostagem(): void {
    this.postagens.push(this.postagem);
    this.postagem = new Postagem();
  }
}
