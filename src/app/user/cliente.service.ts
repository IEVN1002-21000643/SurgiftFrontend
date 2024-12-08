import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../interface/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  public verOrdenes(data:any){
    return this.http.get('http://127.0.0.1:5000/misOrdenes/'+data)
  }
  public verOrden(idO:any, idU:any){
    return this.http.get('http://127.0.0.1:5000/miOrden/'+idO+'/'+idU)
  }
  public cancelarOrden(id:number, dataOrden:any){
    return this.http.put('http://127.0.0.1:5000/orden/'+id, dataOrden)
  }
  public modificarUsuario(id:number, datos:FormData){
    return this.http.put('http://127.0.0.1:5000/usuario/'+id, datos)
  }
  public eliminarUsuario(id:number):Observable<Usuarios>{
    return this.http.delete<Usuarios>('http://127.0.0.1:5000/usuario/'+id)
  }
  public verPseudos(id:number){
    return this.http.get('http://127.0.0.1:5000/pseudoperfiles/'+id)
  }
  public verPseudo(id:number, idU:number){
    return this.http.get('http://127.0.0.1:5000/pseudoperfil/'+id+'/'+idU)
  }
  public crearPseudo(data:any){
    return this.http.post('http://127.0.0.1:5000/pseudoperfil', data)
  }
  public editarPseudo(data:any){
    return this.http.put('http://127.0.0.1:5000/pseudoperfil', data)
  }
  public eliminarPseudo(idP:number, idU:number){
    return this.http.delete('http://127.0.0.1:5000/pseudoperfil/'+idP+'/'+idU)
  }
}
