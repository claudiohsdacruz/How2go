import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import { PostagemService } from 'src/app/shared/services/postagem.service';
import {MatDialog} from '@angular/material/dialog';
import {AbrirImagemComponent} from '../abrir-imagem/abrir-imagem.component'

@Component({
  selector: 'app-listar-postagem',
  templateUrl: './listar-postagem.component.html',
  styleUrls: ['./listar-postagem.component.scss']
})
export class ListarPostagemComponent implements OnInit {

  postagens = Array<Postagem>();

  constructor(private postagemService: PostagemService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.postagemService.listar().subscribe(
      postagens => this.postagens = postagens
    );
  }

  openDialog(postagem: Postagem): void {
    let dialogRef = this.dialog.open(AbrirImagemComponent, {
      width: '1000px', height: '500px',
      data: {
        postagem
      }
    });
  }

  remover(postagem: Postagem): void {
    const indxPostagemARemover = this.postagens.findIndex(p => p.id === postagem.id)
    if (indxPostagemARemover > -1) {
      this.postagens.splice(indxPostagemARemover, 1);
    } 
  }

  inserirComentario(postagem:Postagem,comentario:string):void{
    this.postagemService.inserirComentario(postagem,comentario).subscribe(
      ()=>undefined
    );
  }

  clickLike(postagem: Postagem): number {
    return this.postagemService.clickLike(postagem);
  }
}
