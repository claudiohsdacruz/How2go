import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../shared/services/dialog.service';
// import {PostagemFirestoreService} from 'src/app/shared/services/postagem-firestore.service';
import { POSTAGENS_LISTAR } from 'src/app/shared/model/postagens_listar';
import {usuarioLogado} from '../../shared/model/usuario_logado';
import { PostagemService } from 'src/app/shared/services/postagem.service';

@Component({
  selector: 'app-listar-postagem',
  templateUrl: './listar-postagem.component.html',
  styleUrls: ['./listar-postagem.component.scss']
})
export class ListarPostagemComponent implements OnInit {

  postagens = POSTAGENS_LISTAR;
  usuario_logado = usuarioLogado;
  
  constructor(private postagemService: PostagemService, public dialog: MatDialog, private dialogService: DialogService) { 
    
  }

  ngOnInit(): void {
    // if(this.usuario_logado[0].email==undefined) {
    //   this.dialogService.openDialogLoginUsuario();
    // } 
    
    this.postagemService.listar().subscribe(
      postagens =>{
        for(let p=0; p<this.postagens.length; p++) {
          this.postagens.shift();
        }
        for(let post of postagens){        
          this.postagens.push(post)
        }
      }
    );
  }

  openDialogAbrirImagem(postagem: Postagem): void {
    this.dialogService.openDialogAbrirImagem(postagem);
  }

  inserirComentario(postagem:Postagem,comentario:string):void{    
    this.postagemService.inserirComentario(postagem,comentario).subscribe(
    );   
  }

  clickLike(postagem: Postagem): number {
    return this.postagemService.clickLike(postagem);
  }

  filtrar(value: string): void {
    let posts: Postagem[]
    posts = []
    this.postagemService.listar().subscribe(
      postagens=>{
        for (let post of postagens){
          if(post.destino.toLowerCase().includes(value)) {
            posts.push(post)
          }
        }
        this.postagens = posts
      } 
    )
  }

  remover(postagem: Postagem): void {
    this.postagemService.remover(postagem.id).subscribe(
      ()=>{
        const indxPostagemARemover = this.postagens.findIndex(p => p.id === postagem.id)
        if (indxPostagemARemover > -1) {
          this.postagens.splice(indxPostagemARemover, 1);
        }
      }
    )
  }
  
}
