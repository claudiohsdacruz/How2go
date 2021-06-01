import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/shared/model/postagem';
import { Usuario } from 'src/app/shared/model/usuario';
import { MensagemService } from 'src/app/shared/services/mensagem.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  usuario = new Usuario();
  senha1:string;
  senha2:string;
  file = '';
  senhaEdit = false;

  constructor(private usuarioService: UsuarioService, private mensagemService: MensagemService, private rotaAtual:ActivatedRoute, private roteador: Router) { 
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(Number(idParaEdicao)).subscribe(
      usuario => {this.usuario = usuario}
    );
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

  editarUsuario(): void{
    if(this.usuario.nome==undefined || this.usuario.email==undefined) {
      this.mensagemService.snackAviso('Preencha todos os campos');
    }   
    else{
      this.usuario.nome = this.usuario.nome.toLowerCase();
      let usuarioEmail: Usuario;
      this.usuarioService.getUsuarioPorEmail(this.usuario.email).subscribe(
        usuario => {
          usuarioEmail = usuario
          if(usuarioEmail.email==this.usuario.email){
            if (this.usuario.senha!=undefined && this.senha1==this.usuario.senha){
              this.usuario.senha = this.senha2;
              this.usuarioService.atualizar(this.usuario).subscribe(
                 usuario => {
                   this.mensagemService.snackSucesso('Usuario editado com sucesso');
                   this.roteador.navigate(['listarPostagens'])
                }
              );
            }
            else{
              this.mensagemService.snackErro('A senha antiga está incorreta.')
            }
          }
          else if(usuarioEmail) {
            this.mensagemService.snackErro('Email ja cadastrado. Tente novamente')
          }      
        }
      );    
    }
  }

  alterarSenha(): void {
    if(this.senhaEdit) {
      this.senhaEdit = false;
    }
    else {
      this.senhaEdit = true;
    }
  }
}
