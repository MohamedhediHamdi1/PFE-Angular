import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Navbar1Component } from './navbar1.component';

@Injectable({
  providedIn: 'root'
})
export class SharedInboxService {

  private currentChannelSubject = new BehaviorSubject<string>('');
  private newMessages = new BehaviorSubject<boolean>(false);
  private newNotificatinos = new BehaviorSubject<boolean>(false);

  setCurrentChannel(channel: string) {
    this.currentChannelSubject.next(channel);
  }

  getCurrentChannel() {
    return this.currentChannelSubject.value;
  }
  setnewMessages(channel: boolean) {
    this.newMessages.next(channel);
  }

  getnewMessages() {
    return this.newMessages.value;
  }
  setnewNotificatinos(channel: boolean) {
    this.newNotificatinos.next(channel);
  }

  getnewNotificatinos() {
    return this.newNotificatinos.value;
  }

  private searchResults = new BehaviorSubject<boolean>(false);
  currentSearchResults = this.searchResults.asObservable();
  updateSearchResults(results:boolean) {
    this.searchResults.next(results);
  }
}
