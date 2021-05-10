import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import {usuarioLogado} from  '../../shared/model/usuario_logado';

@Component({
  selector: 'app-logar-usuario',
  templateUrl: './logar-usuario.component.html',
  styleUrls: ['./logar-usuario.component.scss']
})

@Injectable({
  providedIn: 'root', // <---- Adiciona isto ao serviço
})


export class LogarUsuarioComponent implements OnInit {
  email:string;
  senha:string;
  usuario_logado = usuarioLogado;

  constructor( public dialog: MatDialog, private dialogService: DialogService, private usuarioService: UsuarioService) { 
    
  }

  ngOnInit(): void {
    
  }
  
  openDialogCadastroUsuario():void{
    this.dialogService.openDialogCadastroUsuario();
  }

  entrar(email: string, senha: string){
    this.usuarioService.entrar(email, senha)
  }
}
