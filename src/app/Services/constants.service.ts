import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  ServerIp="http://4.204.236.10/api"
  //ServerIp="http://4.204.236.10:8082/api"
  //ServerIp="http://localhost:8081"

  constructor() { }
}
