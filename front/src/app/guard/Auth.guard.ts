import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { LocalStorageService } from "../services/localstorage.service";
import { NavigateService } from "../services/navigation.service";

export const auth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let localStorage = inject(LocalStorageService);
    let navigation = inject(NavigateService)
    let usuarioId = localStorage.getUserId();
    if (usuarioId === null || usuarioId === undefined || usuarioId === '' || usuarioId === ' ') {
        navigation.gotToLogin();
        return false
    }
    return true;
}