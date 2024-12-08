import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from './interface/productos';
import { Usuarios } from './interface/usuarios';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public verProductos():Observable<Productos[]>{
    return this.http.get<Productos[]>('http://127.0.0.1:5000/productos')
  }

  public verProducto(id:number):Observable<Productos[]>{
    return this.http.get<Productos[]>('http://127.0.0.1:5000/producto/'+id)
  }

  public verUsuario(id:number):Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>('http://127.0.0.1:5000/usuario/'+id)
  }
}
