import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Postagem } from 'src/app/shared/model/postagem';
import { Usuario } from 'src/app/shared/model/usuario';
import { usuarioLogado } from 'src/app/shared/model/usuario_logado';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {
  usuario=new Usuario();
  senha1:string;
  senha2:string;
  file = '';
  usuario_logado = usuarioLogado;

  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<DialogService>) { 

  }

  ngOnInit(): void {
  }

  uploadFoto($event:Event) {
    let files = ($event.target as HTMLInputElement).files;
    this.file = files[0].name
    this.usuarioService.uploadFoto($event).subscribe(
      foto=> this.usuario.foto= foto 
    );
  }

  cadastrarUsuario(){
    this.usuario.nome = this.usuario.nome.toLowerCase();
    if (this.senha1===this.senha2){
      this.usuario.senha = this.senha1;
      this.usuario.postagens = new Array<Postagem>();
      this.usuarioService.cadastrar(this.usuario).subscribe(
        usuario => {let id = usuario.id.toString(); localStorage.setItem("id", id)}
      );
    }
    else{
      console.log('senha invalida')
    }
    this.dialogRef.close();  
    this.usuario=new Usuario();
  }
}
