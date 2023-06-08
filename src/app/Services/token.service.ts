import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import jwtDecode from 'jwt-decode';
import { ConstantsService } from './constants.service';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  
  private readonly key = 'piounhF9487860jhkj_èçé465,kll';
  constructor( private http: HttpClient,private constants: ConstantsService) { }

  email:string="";
  verfToken():boolean{
    try {
      const token = this.getToken()
      if(token != null ){
        const decodedToken:any = jwtDecode(token);
        this.email = decodedToken.sub;
        if (this.email !== this.getEmail()) {
          return false
        }else{
          return true
        }
      }else{
        return false
      }
    } catch (error) {
      return false
    }
  }

  async checkUser(): Promise<boolean> {
    try{
    if (this.verfToken()) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.getToken(),
          'Content-Type': 'application/json'
        })
      };
        interface MyResponse {
          response: string;
          token: string;
        }
        const response = await this.http.post<MyResponse>(this.constants.ServerIp+'/users/checklogin', {"email":this.getEmail(),"password":this.getUser()}, httpOptions).toPromise();
        if (response?.response.includes("true")) {
          return true;
        } else {
          return false;
        }
      
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
  }
  setToken(token: string): void {
    const encryptedToken = CryptoJS.AES.encrypt(token, this.key).toString();
    localStorage.setItem('l', encryptedToken);
  }

  getToken(): string {
    const encryptedToken = localStorage.getItem('l');
    if (encryptedToken) {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, this.key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return "0";
  }
  setUser(user: string): void {
    const encryptedToken = CryptoJS.AES.encrypt(user, this.key).toString();
    localStorage.setItem('u', encryptedToken);
  }

  getUser(): string {
    const encryptedToken = localStorage.getItem('u');
    if (encryptedToken) {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, this.key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return "0";
  }

  setEmail(email: string): void {
    const encryptedEmail = CryptoJS.AES.encrypt(email, this.key).toString();
    localStorage.setItem('n', encryptedEmail);
  }

  getEmail(): string {
    const encryptedEmail = localStorage.getItem('n');
    if (encryptedEmail) {
      const bytes = CryptoJS.AES.decrypt(encryptedEmail, this.key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return "0";
  }
}
