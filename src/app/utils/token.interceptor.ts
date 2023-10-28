import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { MessagesService } from '../services/dialog/message.service';
import { ConfirmService } from '../services/dialog/confirm.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,     
    private confirmService: ConfirmService,
    private MessagesService: MessagesService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {     
          this.confirmService.DialogloginFailed().then((result) => {
            if (result === 'Confirmed') {
              this.authService.logout();
            } else {
              this.authService.logout();
            }
          });
        }
        return throwError(error);
      })
    );
  }
}
