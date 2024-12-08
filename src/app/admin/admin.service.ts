import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../interface/productos';
import { Usuarios } from '../interface/usuarios';
import { Repartidor } from '../interface/repartidor';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public verProductos():Observable<Productos[]>{
    return this.http.get<Productos[]>('http://127.0.0.1:5000/productos')
  }
  public verProducto(id:number):Observable<Productos[]>{
    return this.http.get<Productos[]>('http://127.0.0.1:5000/producto/'+id)
  }
  public agregarNuevoProducto(datos:FormData){
    return this.http.post('http://127.0.0.1:5000/producto', datos)
  }
  public modificarProducto(id:number, datos:FormData){
    return this.http.put('http://127.0.0.1:5000/producto/'+id, datos)
  }
  public eliminarProducto(id:number):Observable<Productos>{
    return this.http.delete<Productos>('http://127.0.0.1:5000/producto/'+id)
  }

  public verUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>('http://127.0.0.1:5000/usuarios')
  }
  public verUsuario(id:number):Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>('http://127.0.0.1:5000/usuario/'+id)
  }
  public agregarNuevoUsuario(datos:FormData){
    return this.http.post('http://127.0.0.1:5000/usuario', datos)
  }
  public modificarUsuario(id:number, datos:FormData){
    return this.http.put('http://127.0.0.1:5000/usuario/'+id, datos)
  }
  public eliminarUsuario(id:number):Observable<Usuarios>{
    return this.http.delete<Usuarios>('http://127.0.0.1:5000/usuario/'+id)
  }

  public verRepartidores():Observable<Repartidor[]>{
    return this.http.get<Repartidor[]>('http://127.0.0.1:5000/repartidores')
  }
  public verRepartidor(id:number):Observable<Repartidor[]>{
    return this.http.get<Repartidor[]>('http://127.0.0.1:5000/repartidor/'+id)
  }
  public agregarNuevoRepartidor(datos:FormData){
    return this.http.post('http://127.0.0.1:5000/repartidor', datos)
  }
  public modificarRepartidor(id:number, datos:FormData){
    return this.http.put('http://127.0.0.1:5000/repartidor/'+id, datos)
  }
  public eliminarRepartidor(id:number):Observable<Repartidor>{
    return this.http.delete<Repartidor>('http://127.0.0.1:5000/repartidor/'+id)
  }

  public verOrdenes(){
    return this.http.get('http://127.0.0.1:5000/ordenes')
  }
  public verOrden(idO:number){
    return this.http.get('http://127.0.0.1:5000/orden/'+idO)
  }
  public agregarNuevaverOrden(datos:any){
    return this.http.post('http://127.0.0.1:5000/orden', datos)
  }
  public modificarOrden(id:number, datos:any){
    return this.http.put('http://127.0.0.1:5000/orden/'+id, datos)
  }
  public eliminarverOrden(id:number){
    return this.http.delete('http://127.0.0.1:5000/orden/'+id)
  }

  public verVentasMes(){
    return this.http.get('http://127.0.0.1:5000/ventas_mes')
  }
  public verUsuariosMes(){
    return this.http.get('http://127.0.0.1:5000/usuarios_mes')
  }
  public verProductosMes(){
    return this.http.get('http://127.0.0.1:5000/productos_mes')
  }
  public verTotalVenta(){
    return this.http.get('http://127.0.0.1:5000/total_venta')
  }
  public verNumUsuarios(){
    return this.http.get('http://127.0.0.1:5000/num_usuario')
  }
  public verNumOrdenes(){
    return this.http.get('http://127.0.0.1:5000/num_ordenes')
  }
  public verPromProducto(){
    return this.http.get('http://127.0.0.1:5000/promedio_producto')
  }
  public verPromVenta(){
    return this.http.get('http://127.0.0.1:5000/promedio_venta')
  }
}
