import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
// import {PostagemFirestoreService} from 'src/app/shared/services/postagem-firestore.service';
import { PostagemService } from 'src/app/shared/services/postagem.service';
import { usuarioLogado } from 'src/app/shared/model/usuario_logado';

@Component({
  selector: 'app-criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrls: ['./criar-postagem.component.scss']
})
export class CriarPostagemComponent implements OnInit {
  postagem: Postagem;
  fotos = new Array<string>();
  usuario = usuarioLogado;
  
  constructor(private postagemService: PostagemService) {
    this.postagem = new Postagem();
   }

  ngOnInit(): void {
  }
   
  inserirPostagem(): void {
    this.postagem.usuario = this.usuario[0];
    // this.usuario[0].postagens.push(this.postagem);
    this.postagemService.inserir(this.postagem).subscribe(
    );
    this.postagem = new Postagem();
  }

  uploadFotos($event:Event): void{
    this.postagem.fotos=this.postagemService.onChange($event);
  }
}
