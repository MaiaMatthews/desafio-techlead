import { Injectable } from '@angular/core';

interface StoragedObject {
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private USER_ID: string = 'object';

  public getUserId(): string | null {
    return localStorage.getItem(this.USER_ID);
  }

  public saveUserId(data: string) {
    localStorage.setItem(this.USER_ID, data);
  }

  public deleteUser() {
    localStorage.removeItem(this.USER_ID);
  }
}
    