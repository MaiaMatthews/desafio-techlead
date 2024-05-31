import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { LocalStorageService } from "../services/localstorage.service";
import { Injectable } from "@angular/core";
import { OverlayService } from "../services/overlay.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private localStorageService: LocalStorageService, private overLayService: OverlayService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let userid = this.localStorageService.getUserId();

        let reqClone = req.clone();

        if (userid != null) {
            reqClone = req.clone({
                headers: req.headers.set('usuarioId', userid)
            })
        }

        return next.handle(reqClone).pipe(
            catchError((err) => {

                let error = err.error.message;

                if (error !== undefined && error !== null) {
                    this.overLayService.showToast(error)
                }

                throw error;
            })
        );
    }

}