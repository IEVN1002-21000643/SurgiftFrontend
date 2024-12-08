import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from './interface/productos';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito:any=[]

  constructor(private http: HttpClient) { }

  agregarCarrito(idProducto:number, cantidad:number, decoracion:any, envio:any){
    if(decoracion.length==undefined || decoracion.length==0){
      decoracion.push('')
      decoracion.push(0)
    }
    if(envio.length==undefined || envio.length==0){
      envio.push('')
      envio.push('')
    }
    let data={
      'idProducto': idProducto,
      'cantidad': cantidad,
      'decoracion': decoracion[0],
      'precioDeco': decoracion[1],
      'destinatario': envio[0],
      'fechaLlegada': envio[1]
    }
    this.carrito=this.verCarrito()
    if(this.carrito){
      let datos=this.carrito
      let exist=0
      let listaProducto=[]
      for(let fila of datos){
        if(fila.idProducto==idProducto && fila.decoracion==decoracion[0]){
          fila.cantidad=fila.cantidad+cantidad
          exist=1
        }
        listaProducto.push(fila)
      }
      if(exist==0){
        datos.push(data)
        localStorage.setItem('carrito', JSON.stringify(datos))
      }else{
        localStorage.setItem('carrito', JSON.stringify(listaProducto))
      }
    }else{
      localStorage.setItem('carrito', JSON.stringify([data]))
    }
  }

  agregarCantidad(idProducto:number, cantidad:number, decoracion:any, envio:any){
    if(decoracion.length==undefined){
      decoracion.push('')
      decoracion.push(0)
    }
    if(envio.length==undefined){
      envio.push('')
      envio.push('')
    }
    let data={
      'idProducto': idProducto,
      'cantidad': cantidad,
      'decoracion': decoracion[0],
      'precioDeco': decoracion[1],
      'destinatario': envio[0],
      'fechaLlegada': envio[1]
    }
    this.carrito=this.verCarrito()
    if(this.carrito){
      let datos=this.carrito
      let exist=0
      let listaProducto=[]
      for(let fila of datos){
        if(fila.idProducto==idProducto && fila.decoracion==decoracion[0]){
          fila.cantidad=cantidad
          fila.destinatario=envio[0]
          fila.fechaLlegada=envio[1]
          exist=1
        }
        listaProducto.push(fila)
      }
      if(exist==0){
        datos.push(data)
        localStorage.setItem('carrito', JSON.stringify(datos))
      }else{
        localStorage.setItem('carrito', JSON.stringify(listaProducto))
      }
    }else{
      localStorage.setItem('carrito', JSON.stringify([data]))
    }
  }
  
  verCarrito(){
    return JSON.parse(localStorage.getItem('carrito')!)
  }

  eliminarDeCarrito(idProducto:number, decoracion:any){
    this.carrito=this.verCarrito()
    let listaProductos:any=[]
    if(this.carrito){
      let datos=this.carrito
      for(let fila of datos){
        if(fila.idProducto==idProducto && fila.decoracion==decoracion){
          
        }else{
          listaProductos.push(fila)
        }
      }
      console.log(listaProductos)
      localStorage.setItem('carrito', JSON.stringify(listaProductos))
    }
  }

  vaciarCarrito(){
    localStorage.removeItem('carrito')
  }

  public verProducto(id:number):Observable<Productos[]>{
    return this.http.get<Productos[]>('http://127.0.0.1:5000/producto/'+id)
  }
}
