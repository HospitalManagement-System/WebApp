import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';
import { CacheInfo } from '../Component/shared/CacheInfo';
import { LoaderService } from '../Services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,private loader: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.show()
    console.log('Intercept');    
    const token = CacheInfo.get("currentUser")!=null ? JSON.parse(CacheInfo.get("currentUser")).token : null;
    if (token != null) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(req).pipe(
      finalize(() => {
       setTimeout(() => {
        this.hide();
      }, 5000);
      })
    );
  }
  hide(){
    this.loader.hide()
  }
}
