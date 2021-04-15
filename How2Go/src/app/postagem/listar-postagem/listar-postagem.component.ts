import { Component, OnInit, Inject } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import { PostagemService } from 'src/app/shared/services/postagem.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-listar-postagem',
  templateUrl: './listar-postagem.component.html',
  styleUrls: ['./listar-postagem.component.scss']
})
export class ListarPostagemComponent implements OnInit {

  postagens = Array<Postagem>();

  constructor(private postagemService: PostagemService) { }

  ngOnInit(): void {
    this.postagens = this.postagemService.listar();
  }

  remover(postagem: Postagem): void {
    const indxPostagemARemover = this.postagens.findIndex(p => p.id === postagem.id)
    if (indxPostagemARemover > -1) {
      this.postagens.splice(indxPostagemARemover, 1);
    } 
  }
}
