import { TestBed } from '@angular/core/testing';
import { IMessage } from '@stomp/stompjs';
import { RxStomp } from '@stomp/rx-stomp';
import { Subject } from 'rxjs';

import { WebSocketService } from './websocket';
import { SystemStatusDto } from '../models/SystemStatusDto';
import { environment } from '../environments/environment';

describe('WebSocketService', () => {
  let topic: Subject<IMessage>;
  let configureSpy: jasmine.Spy;
  let activateSpy: jasmine.Spy;
  let watchSpy: jasmine.Spy;
  let service: WebSocketService;

  const status = (serverName: string, cpuUsage: number): SystemStatusDto => ({
    serverName,
    region: 'us-east',
    cpuUsage,
    memUsage: 40,
    status: 'STABLE',
    latestError: '',
    dateTime: '2026-01-01T00:00:00Z',
  });

  const emit = (dto: SystemStatusDto) => topic.next({ body: JSON.stringify(dto) } as IMessage);

  beforeEach(() => {
    // Avoid opening a real websocket: stub the RxStomp methods the service uses.
    topic = new Subject<IMessage>();
    configureSpy = spyOn(RxStomp.prototype, 'configure');
    activateSpy = spyOn(RxStomp.prototype, 'activate');
    watchSpy = spyOn(RxStomp.prototype, 'watch').and.returnValue(topic.asObservable());
    spyOn(console, 'log');

    service = TestBed.inject(WebSocketService);
  });

  it('should be created with an empty server list', () => {
    expect(service).toBeTruthy();
    expect(service.serverList()).toEqual([]);
  });

  it('should configure the broker URL and activate the connection', () => {
    expect(configureSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ brokerURL: environment.socketUrl }),
    );
    expect(activateSpy).toHaveBeenCalledTimes(1);
  });

  it('should subscribe to /topic/system-metrics', () => {
    expect(watchSpy).toHaveBeenCalledWith('/topic/system-metrics');
  });

  it('should add a server to serverList when a message arrives', () => {
    emit(status('srv-1', 10));

    expect(service.serverList()).toEqual([status('srv-1', 10)]);
  });

  it('should keep one entry per server and update it with the latest message', () => {
    emit(status('srv-1', 10));
    emit(status('srv-2', 20));
    emit(status('srv-1', 99));

    const list = service.serverList();
    expect(list.length).toBe(2);
    expect(list.find((s) => s.serverName === 'srv-1')?.cpuUsage).toBe(99);
    expect(list.find((s) => s.serverName === 'srv-2')?.cpuUsage).toBe(20);
  });
});
