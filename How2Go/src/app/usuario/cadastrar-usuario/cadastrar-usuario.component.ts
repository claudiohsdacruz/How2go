import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario';
import { USUARIOS} from '../../shared/model/USUARIOS';
@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {
  usuario=new Usuario();
  USUARIOS=USUARIOS;
  senha1:string;
  senha2:string;

  constructor() { 

  }

  ngOnInit(): void {
  }

  uploadFoto($event:Event){}

  cadastrarUsuario(){
    if (this.usuario.foto_perfil==undefined){
      this.usuario.foto_perfil='';
    }
    this.usuario.logado = true;
    this.usuario.senha=this.senha1;
    this.USUARIOS.push(this.usuario);
    console.log(this.USUARIOS);
    this.usuario=new Usuario();
  }
}
