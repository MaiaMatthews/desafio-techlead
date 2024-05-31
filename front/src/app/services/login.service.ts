import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './localstorage.service';
import { NavigateService } from './navigation.service';
import { catchError, tap } from 'rxjs';

export interface Form {
  nome: string;
  senha: string;
  confirmaSenha?:string;
}


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  BASE_URL = `${environment.BASE_URL}`;

  constructor(
    private httpclient: HttpClient,
    private localstorageService: LocalStorageService,
    private navigateService: NavigateService
  ) {}

  login(object:Form) {
    return this.httpclient.post(`${this.BASE_URL}login`, object).pipe(
      tap(async (response) => {
        let res = response as any;
        console.log(res)
        this.localstorageService.saveUserId(res.id);
        await this.navigateService.goToLivro();
      }),
    );
  }

  async logout(){
    this.localstorageService.saveUserId('');
    this.navigateService.gotToLogin();
  }
}
