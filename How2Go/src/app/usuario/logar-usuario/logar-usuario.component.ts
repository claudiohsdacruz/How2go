import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/shared/model/usuario';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { CadastrarUsuarioComponent } from '../cadastrar-usuario/cadastrar-usuario.component';

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
  usuarioLogado=new Usuario();

  constructor( public dialog: MatDialog, private dialogService: DialogService) { 
    this.usuarioLogado.nome = 'bruna';
  }

  ngOnInit(): void {
  }
  
  getUsuarioLogado():Usuario{
    return this.usuarioLogado;
  }
  openDialogCadastroUsuario():void{
    this.dialogService.openDialogCadastroUsuario();
  }
  logarUsuario(){}
}
