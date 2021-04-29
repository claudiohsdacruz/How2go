import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import {PostagemFirestoreService} from 'src/app/shared/services/postagem-firestore.service';

@Component({
  selector: 'app-criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrls: ['./criar-postagem.component.scss']
})
export class CriarPostagemComponent implements OnInit {
  postagem: Postagem;
  fotos = new Array<string>();
  
  constructor(private postagemService: PostagemFirestoreService) {
    this.postagem = new Postagem();
    this.postagem.icone='../../assets/postagem/logan.jpg';
   }

  ngOnInit(): void {
  }
   
  inserirPostagem(): void {
    this.postagemService.inserir(this.postagem).subscribe(
      usuario => console.log(usuario)
    );
    this.postagem = new Postagem();
  }

  uploadFotos($event:Event): void{
    this.postagem.foto=this.postagemService.onChange($event);
  }
}
