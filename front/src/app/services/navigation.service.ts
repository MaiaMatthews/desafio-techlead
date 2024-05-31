import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  constructor(private route: Router) {}

  async gotToLogin() {
    await this.route.navigate(['login']);
  }

  async goToLivro() {
    await this.route.navigate(['livros']);
  }
}
