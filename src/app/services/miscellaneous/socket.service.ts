import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SocketMasterService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();

  constructor(private CookieService: CookieService) {
    super({
      url: environment.apiSocket,
      options: {
        query: {
          nameRoom: CookieService.get('room')
        }
      }
    });

    this.listenFromClient();
  }

  listenFromClient() {
    this.ioSocket.on('notification', (res: any) => this.outEven.emit(res))
  }

}
