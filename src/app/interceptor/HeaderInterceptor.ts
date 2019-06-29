import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CommonService } from '../Services/common.service';

@Injectable()

export class Headerinterceptor implements HttpInterceptor{

    constructor(private auth:CommonService){}

    intercept(req: HttpRequest<any>, next:HttpHandler){
        const authToken =this.auth.getToken()
console.log(authToken)
        const token = req.clone({
            headers: req.headers.set("Authorization", "Bearer "+ authToken)
        })

            return next.handle(token)
        
    }
}