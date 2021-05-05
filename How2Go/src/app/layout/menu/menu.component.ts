import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PostagemFirestoreService } from 'src/app/shared/services/postagem-firestore.service';
import { POSTAGENS_LISTAR } from 'src/app/shared/model/postagens_listar';
import {usuarioLogado} from '../../shared/model/usuario_logado';
import { UsuarioService } from 'src/app/shared/services/usuario-firestore.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  usuario = usuarioLogado; 
  postagens = POSTAGENS_LISTAR;

  constructor(private postagemService: PostagemFirestoreService, private dialogService: DialogService, private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {

  }

  openDialogCadastroUsuario():void{
    this.dialogService.openDialogCadastroUsuario();
  }

  openDialogLoginUsuario():void{
    this.dialogService.openDialogLoginUsuario();
  }

  filtrar(value: string): void {
    this.postagemService.pesquisar(value);
  } 

  sair(): void {
    this.usuarioService.sair();
  }
  
  voltar(){
    window.scrollTo(0, 0);
  }
}
