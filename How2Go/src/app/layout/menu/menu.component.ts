import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario';
import {PostagemService} from '../../shared/services/postagem.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Postagem } from 'src/app/shared/model/postagem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  usuario:Usuario; 
  postagens: Postagem[];

  constructor(private postagemService: PostagemService, private dialogService: DialogService) { }
  ngOnInit(): void {
    this.usuario=new Usuario();   

    this.postagemService.listar().subscribe(
      p=> this.postagens = p     
    )
  }

  openDialogCadastroUsuario():void{
    this.dialogService.openDialogCadastroUsuario();
  }

  openDialogLoginUsuario():void{
    this.dialogService.openDialogLoginUsuario();
  }

  filtrar(value: string) {
    // this.postagens.filter = value.trim().toLowerCase();
    console.log(this.postagens)
  }
}
