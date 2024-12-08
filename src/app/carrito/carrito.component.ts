import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export default class CarritoComponent implements OnInit{
  listaCarrito:any=[]
  listaProductos:any=[]
  producto:any
  formCarrito!:FormGroup
  subtotal:number=0
  servicio:number=0
  entrega:number=238
  total:number=0

  constructor(private carrito:CarritoService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.verCarrito()
    this.formCarrito=this.initForm()
  }
  initForm():FormGroup{
    return this.fb.group({
      cantidad: ['', Validators.required]
    })}
  verCarrito(){
    this.listaCarrito=this.carrito.verCarrito()
    for(let fila of this.listaCarrito){
      this.servicio=this.servicio+(fila.precioDeco*fila.cantidad)
      this.carrito.verProducto(fila.idProducto).subscribe({
        next: response=>{
          this.producto=response
          this.producto.Producto[0].cantidad=fila.cantidad
          this.producto.Producto[0].precioDeco=fila.precioDeco
          this.producto.Producto[0].subtotal=(fila.cantidad*this.producto.Producto[0].precio)
          this.producto.Producto[0].decoracion=fila.decoracion
          this.listaProductos.push(this.producto.Producto[0])
          this.subtotal=this.subtotal+this.producto.Producto[0].subtotal
        }, complete: ()=>{this.calcularTotal()}
      })
    }
  }
  agregarCantidad(idProducto:number, cantidad:number, decoracion:any, envio:any){
    this.carrito.agregarCantidad(idProducto, cantidad, decoracion, envio)
    this.listaProductos=[]
    this.servicio=0
    this.subtotal=0
    this.verCarrito()
  }
  calcularTotal(){
    this.total=this.subtotal+this.servicio+this.entrega
  }
  eliminar(idProducto:number, decoracion:any){
    this.carrito.eliminarDeCarrito(idProducto, decoracion)
    this.listaProductos=[]
    this.subtotal=0
    this.servicio=0
    this.entrega=238
    this.total=0
    this.verCarrito()
  }
  vaciar(){
    this.carrito.vaciarCarrito()
    this.listaProductos=[]
    this.subtotal=0
    this.servicio=0
    this.entrega=238
    this.total=0
    this.verCarrito()
  }
}
