import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { CommonModule } from '@angular/common';
import { SesionService } from '../auth/sesion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { FinalizarCompraService } from '../finalizar-compra.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Usuarios } from '../interface/usuarios';

@Component({
  selector: 'app-finalizar-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.css'
})
export default class FinalizarCompraComponent implements OnInit{
  listaCarrito:any=[]
  producto:any
  listaProductos:any=[]
  subtotal:number=0
  servicio:number=0
  entrega:number=238
  total:number=0
  idUser:string|null=''
  formPago!:FormGroup
  advertencia=''
  orden:any={}
  carritoExist=false
  dataSource:any
  datosUser:Usuarios={
    idUsuario:0,
    nombre:'',
    correo:'',
    direccion:'',
    fechaCreacion:'',
    estatus:'',
    foto:''
  }
  estado=''
  ciudad=''
  colonia=''
  calle=''
  cp=''
  numExt=''
  numInt=''
  telefono=''
  fechaLlegada=''
  
  constructor(private fb:FormBuilder, private carrito:CarritoService, private sesion:SesionService, private compra:FinalizarCompraService, private router:Router, private user:UserService){}
  
  ngOnInit(): void {
    this.idUser=this.sesion.getId()
    if(this.idUser==undefined){
      this.formPago=this.initForm()
    }else{
      this.user.verUsuario(Number(this.idUser)).subscribe({
        next: response=>{
          this.dataSource=response
          this.asignarCampos(this.dataSource.Usuarios)
        }
      })
    }
    
    this.verCarrito()
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      ciudad: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', Validators.required],
      numInt: [''],
      numExt: ['', Validators.required],
      telefono: ['', Validators.required]
    })
  }

  verCarrito(){
    this.listaCarrito=this.carrito.verCarrito()
    for(let fila of this.listaCarrito){
      this.servicio=this.servicio+(fila.precioDeco*fila.cantidad)
      this.carrito.verProducto(fila.idProducto).subscribe({
        next: response=>{
          this.producto=response
          this.producto.Producto[0].cantidad=fila.cantidad
          this.producto.Producto[0].subtotal=(fila.cantidad*this.producto.Producto[0].precio)
          this.producto.Producto[0].decoracion=fila.decoracion
          this.producto.Producto[0].destinatario=fila.destinatario
          this.producto.Producto[0].fechaLlegada=fila.fechaLlegada
          this.listaProductos.push(this.producto.Producto[0])
          this.subtotal=this.subtotal+this.producto.Producto[0].subtotal
        }, complete: ()=>{
          this.calcularTotal() 
          this.carritoExist=true
        }
      })
    }
  }

  calcularTotal(){
    this.total=this.subtotal+this.servicio+this.entrega
  }

  enviarFormNoUser(){
    if(this.formPago.invalid){
      this.advertencia="Atención, alguno de los campos estan mal rellenados"
    }else{
      const {nombre, correo, estado, ciudad, colonia, calle, cp, numInt, numExt, telefono, destinatario }=this.formPago.value
      this.advertencia=''
      let numeroInt=''
      if(numInt!=''){
        numeroInt=` num. Interior ${numInt},`
      }
      const direccionFormat=`C. ${calle} #${numExt},${numeroInt} ${colonia}, ${cp} ${estado}, ${ciudad}.`

      this.orden.nombre=nombre
      this.orden.correo=correo
      this.orden.direccion=direccionFormat
      this.orden.telefono=telefono
      this.orden.destinatario=destinatario
      this.orden.total=this.total
      this.orden.productos=this.listaProductos

      this.compra.finalizarOrden(this.orden).subscribe({
        next:()=>{
          this.formPago.get('nombre')?.setValue(''),
          this.formPago.get('correo')?.setValue(''),
          this.formPago.get('estado')?.setValue(''),
          this.formPago.get('ciudad')?.setValue(''),
          this.formPago.get('colonia')?.setValue(''),
          this.formPago.get('calle')?.setValue(''),
          this.formPago.get('cp')?.setValue(''),
          this.formPago.get('numInt')?.setValue(''),
          this.formPago.get('numExt')?.setValue(''),
          this.formPago.get('telefono')?.setValue(''),
          this.formPago.get('destinatario')?.setValue('')
        },
        complete:()=>{
          this.carrito.vaciarCarrito()
          this.router.navigate([''])
        }
        })
    }
  }
  asignarCampos(dataSource:any){
    this.datosUser.idUsuario=dataSource.idUsuario
    this.datosUser.nombre=dataSource.nombre
    this.datosUser.correo=dataSource.correo
    this.datosUser.direccion=dataSource.direccion
    this.datosUser.foto=dataSource.foto
    this.datosUser.fechaCreacion=dataSource.fechaCreacion
    this.datosUser.estatus=dataSource.estatus

    const partes = this.datosUser.direccion.split(', ')
    if(partes.length == 4){
      this.estado=partes[3].replace('.', '')
      this.ciudad=partes[2].split(' ')[1]
      this.colonia=partes[1]
      this.calle=partes[0].split(' ')[1]
      this.cp=partes[2].split(' ')[0]
      this.numExt=partes[0].split(' ')[2].replace('#','')
      this.numInt=''
    }else{
      this.estado=partes[4].replace('.', '')
      this.ciudad=partes[3].split(' ')[1]
      this.colonia=partes[2]
      this.calle=partes[0].split(' ')[1]
      this.cp=partes[3].split(' ')[0]
      this.numExt=partes[0].split(' ')[2].replace('#','')
      this.numInt=partes[1].split(' ')[2]
    }
  }
  enviarFormUser(){
      this.advertencia=''
      let numeroInt=''
      if(this.numInt!=''){
        numeroInt=` num. Interior ${this.numInt},`
      }
      const direccionFormat=`C. ${this.calle} #${this.numExt},${numeroInt} ${this.colonia}, ${this.cp} ${this.estado}, ${this.ciudad}.`

      this.orden.nombre=this.datosUser.nombre
      this.orden.correo=this.datosUser.correo
      this.orden.direccion=direccionFormat
      this.orden.telefono=this.telefono
      this.orden.total=this.total
      this.orden.productos=this.listaProductos
      this.orden.idUsuario=this.idUser

      this.compra.finalizarOrden(this.orden).subscribe({
        next:()=>{},
        complete:()=>{
          this.carrito.vaciarCarrito()
          this.router.navigate([''])
        }
      })
  }
}
