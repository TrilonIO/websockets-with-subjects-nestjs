import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

interface WebsocketEvent {
  name: string;
  data: unknown;
}

@Injectable()
export class WebsocketsService {
  private subject = new Subject<WebsocketEvent>();

  addEvent(eventName: string, eventData: unknown): void {
    this.subject.next({ name: eventName, data: eventData });
  }

  getEventSubject$(): Observable<WebsocketEvent> {
    return this.subject.asObservable();
  }
}
