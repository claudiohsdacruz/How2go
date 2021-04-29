import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import { PostagemService } from 'src/app/shared/services/postagem.service';
import {MatDialog} from '@angular/material/dialog';
import {AbrirImagemComponent} from '../abrir-imagem/abrir-imagem.component'
import { LogarUsuarioComponent } from 'src/app/usuario/logar-usuario/logar-usuario.component';
import {DialogService} from '../../shared/services/dialog.service';
import {PostagemFirestoreService} from 'src/app/shared/services/postagem-firestore.service';

@Component({
  selector: 'app-listar-postagem',
  templateUrl: './listar-postagem.component.html',
  styleUrls: ['./listar-postagem.component.scss']
})
export class ListarPostagemComponent implements OnInit {

  postagens = Array<Postagem>();
  
  constructor(private postagemService: PostagemFirestoreService, public dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.dialogService.openDialogLoginUsuario();
    
    this.postagemService.listar().subscribe(
      postagens => this.postagens = postagens
    );
  }

  openDialogAbrirImagem(postagem: Postagem): void {
    this.dialogService.openDialogAbrirImagem(postagem);
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
