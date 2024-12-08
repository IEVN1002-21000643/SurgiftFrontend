import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinalizarCompraService {

  constructor(private http:HttpClient) { }

  public finalizarOrden(dataOrden:any){
    return this.http.post('http://127.0.0.1:5000/orden', dataOrden)
  }
}
