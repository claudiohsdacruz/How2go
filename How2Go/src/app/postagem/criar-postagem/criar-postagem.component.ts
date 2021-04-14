import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import { PostagemService } from 'src/app/shared/services/postagem.service';

@Component({
  selector: 'app-criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrls: ['./criar-postagem.component.scss']
})
export class CriarPostagemComponent implements OnInit {
  postagem: Postagem;

  constructor(private postagemService: PostagemService) {
    this.postagem = new Postagem();
   }

  ngOnInit(): void {
  }

  inserirPostagem(): void {
    this.postagemService.inserir(this.postagem);
    this.postagem = new Postagem();
  }
}
