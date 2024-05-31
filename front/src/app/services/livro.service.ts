import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


export interface Livro{
	nome:string,
	createdAt:Date,
	author:string,
}

@Injectable({
    providedIn:'root'
})
export class LivrosService{



    BASE_URL = `${environment.BASE_URL}livros`;

    constructor(
      private httpclient: HttpClient
    ) {}

    getAllLivro():Observable<Livro[]>{
        return this.httpclient.get<Livro[]>(this.BASE_URL);
    }

    enviar(objectForm: Livro) {
      return this.httpclient.post<any>(this.BASE_URL, objectForm);
    }

    update(objectForm: Livro) {
      return this.httpclient.put<any>(this.BASE_URL, objectForm);
    }

    deletar(id:any): any {
      return this.httpclient.delete<any>(`${this.BASE_URL}/${id}`);
    }

}