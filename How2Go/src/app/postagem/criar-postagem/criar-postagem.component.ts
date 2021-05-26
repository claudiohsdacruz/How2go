import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import { PostagemService } from 'src/app/shared/services/postagem.service';
import { usuarioLogado } from 'src/app/shared/model/usuario_logado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrls: ['./criar-postagem.component.scss']
})
export class CriarPostagemComponent implements OnInit {
  nomeFotos = [''];
  postagem: Postagem;
  fotos = new Array<string>();
  usuario = usuarioLogado;
  
  constructor(private postagemService: PostagemService, private roteador: Router) {
    this.postagem = new Postagem();
   }

  ngOnInit(): void {
  }
   
  inserirPostagem(): void {
    this.postagem.usuario = this.usuario[0];  
    this.postagemService.inserir(this.postagem).subscribe(
      postagem => this.roteador.navigate(['listarPostagens'])
    );
  }

  uploadFotos($event:Event): void{
    let files = ($event.target as HTMLInputElement).files;
    let tamanhoFiles = files.length;
    let tamanhoNomeFotos = this.nomeFotos.length;
    
    for(let i=0;i<tamanhoNomeFotos;i++) {
      this.nomeFotos.shift()
    }
    
    for(let i=0;i<tamanhoFiles;i++) {
      this.nomeFotos.push(files[i].name)
    }

    console.log(this.nomeFotos)
    this.postagem.fotos=this.postagemService.uploadFotos($event);
  }
}
