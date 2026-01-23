import { Injectable, signal } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { SystemStatusDto } from '../models/SystemStatusDto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private rxStomp = new RxStomp();

  private serversMap = new Map<string, SystemStatusDto>();
  public serverList = signal<SystemStatusDto[]>([]);

  constructor() {
    this.connect();
  }

  private connect() {
    this.rxStomp.configure({
      brokerURL: environment.socketUrl,
      reconnectDelay: 200,
    });

    this.rxStomp.activate();

    this.rxStomp.watch('/topic/system-metrics').subscribe((message) => {
      const data: SystemStatusDto = JSON.parse(message.body);

      this.serversMap.set(data.serverName, data);

      this.serverList.set([...this.serversMap.values()]);

      console.log('Data recieved:', data);
    });
  }
}
