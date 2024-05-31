import { Injectable } from "@angular/core";
import { Form } from "./login.service";
import { BaseService } from "./base";
import { tap } from "rxjs";
import { NavigateService } from "./navigation.service";
import { OverlayService } from "./overlay.service";

@Injectable({
    providedIn: "root"
})
export class UsuarioService extends BaseService {


    constructor(private navigationService: NavigateService, private overlayService: OverlayService) {
        super();
    }

    cadastrar(form: Form) {
        return this.httpClient.post(`${this.BASE_URL}usuarios/cadastrar`, form);
    }

}