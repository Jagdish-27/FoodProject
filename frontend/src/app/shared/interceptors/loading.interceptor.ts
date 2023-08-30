import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
var pendingRquests = 0;
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loadingService.showLoading();
    pendingRquests = pendingRquests + 1;

    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type === HttpEventType.Response){
            this.handleHideLoading();
          }
        },
        error:(_)=>{
          this.handleHideLoading();
        }
      })
    );
  }
  handleHideLoading(){
    pendingRquests = pendingRquests - 1;

    if(pendingRquests === 0)
    this.loadingService.hideLoading();
  }
}
