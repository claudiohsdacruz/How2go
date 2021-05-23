import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { POSTAGENS_LISTAR } from 'src/app/shared/model/postagens_listar';
import {usuarioLogado} from '../../shared/model/usuario_logado';
import { UsuarioService } from 'src/app/shared/services/usuario.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  usuario_logado = usuarioLogado; 
  postagens = POSTAGENS_LISTAR;

  constructor(private dialogService: DialogService, private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {
    let id = localStorage.getItem("id");
    if(id!='0') {
      let id2 = parseInt(id);
      this.usuarioService.getUsuario(id2).subscribe(
        usuario => {
          if(usuario) {
            this.usuario_logado.push(usuario); 
            this.usuario_logado.shift()
          }  
          else {
            localStorage.setItem("id","0")
          }
        }
      );
    }
  }

  openDialogCadastroUsuario():void{
    this.dialogService.openDialogCadastroUsuario();
  }

  openDialogLoginUsuario():void{
    this.dialogService.openDialogLoginUsuario();
  }

  // filtrar(value: string): void {
  //   this.postagemService.pesquisar(value);
  // } 

  sair(): void {
    this.usuarioService.sair();
  }
  
  voltar(){
    window.scrollTo(0, 0);
  }
}
