import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Serices_Interface } from '../services-list/ServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchResults = new BehaviorSubject<Serices_Interface[]>([]);
  currentSearchResults = this.searchResults.asObservable();
  updateSearchResults(results: Serices_Interface[]) {
    this.searchResults.next(results);
  }

  private totalServices = new BehaviorSubject<number>(0);
  currentTotalServices = this.totalServices.asObservable();
  updateTotalServices(total: number) {
    this.totalServices.next(total);
  }

  
  search="*"
 

  constructor() { }

 
}
