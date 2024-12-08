import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient) { }

  public agregarNuevoUsuario(datos:FormData){
    return this.http.post('http://127.0.0.1:5000/registro', datos)
  }

  public login(datos:any){
    return this.http.post('http://127.0.0.1:5000/login', datos)
  }
  public setToken(token:string){
    localStorage.setItem('authToken', token)
  }
  public getToken():string|null{
    return localStorage.getItem('authToken')
  }
  public getRole():string|null{
    const token = this.getToken()
    if(token){
      const decode:any=jwtDecode(token)
      return decode.sub.estatus
    }
    return localStorage.getItem('authToken')
  }
  public getId():string|null{
    const token=this.getToken()
    if(token){
      const decode:any=jwtDecode(token)
      return decode.sub.idUsuario
    }
    return localStorage.getItem('authToken')
  }
  public isLoggedIn(): boolean{
    return !!this.getToken()
  }
  public logout(){
    localStorage.removeItem('authToken')
  }
}
