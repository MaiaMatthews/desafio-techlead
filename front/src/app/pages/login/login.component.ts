import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Form, LoginService } from 'src/app/services/login.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: Form = Object.create({})

  controle: {
    btnOneContent: string,
    btnTwoContent: string,
    cadastroMode: boolean,
  } = Object.create({})

  constructor(private loginservice: LoginService, private overLayService:OverlayService, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.loginMode();
  }


  async login() {

    if(this.form.nome === null || this.form.nome === undefined || this.form.nome === ''){
      this.overLayService.showToast("Nome inserido inválido");
      return;
    }

    if(this.form.senha === null || this.form.senha === undefined || this.form.senha === ''){
      this.overLayService.showToast("Informe uma senha");
      return;
    }

    this.loginservice.login(this.form).subscribe();

  }

  cadastro() {
    if(this.form.nome === null || this.form.nome === undefined || this.form.nome === ''){
      this.overLayService.showToast("Nome inserido inválido");
      return;
    }

    if(this.form.senha === null || this.form.senha === undefined || this.form.senha === ''){
      this.overLayService.showToast("Informe uma senha");
      return;
    }

    if(this.form.senha !== this.form.confirmaSenha){
      this.overLayService.showToast("Informa a mesma senha nos 2 campos");
      return;
    }

    this.usuarioService.cadastrar(this.form).pipe(tap(() => {
      this.form = Object.create({})
      this.loginMode();
      this.overLayService.showToast("Usuário cadastrado com sucesso");
  })).subscribe();

  }

  btnOne() {
    this.controle.cadastroMode ? this.cadastro() : this.login();
  }

  btnTwo() {
    this.controle.cadastroMode ? this.loginMode() : this.cadastroMode();
  }

  loginMode() {
    this.controle = {
      btnOneContent: 'Entrar',
      btnTwoContent: 'Cadastre-se',
      cadastroMode: false
    }
  }

  cadastroMode() {
    this.controle = {
      btnOneContent: 'Cadastrar',
      btnTwoContent: 'cancelar',
      cadastroMode: true
    }
  }

}
