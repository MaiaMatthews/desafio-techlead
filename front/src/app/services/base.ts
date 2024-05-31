import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "src/environments/environment";

export abstract class BaseService {
    protected httpClient = inject(HttpClient);
    protected BASE_URL = environment.BASE_URL;
}