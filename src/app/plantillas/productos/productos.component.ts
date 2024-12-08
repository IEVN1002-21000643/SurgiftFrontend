import { Component, OnInit } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { Productos } from '../../interface/productos';
import { UserService } from '../../user.service';
import { FormsModule } from '@angular/forms';
import { DecoracionComponent } from '../decoracion/decoracion.component';
import { CarritoService } from '../../carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, DecoracionComponent, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class ProductosComponent implements OnInit{
  tem:any;
  dataSource:any=[]
  dataProducto:Productos={
    id:0,
    nombre:'',
    precio:0,
    descripcionCorta:'',
    descripcionLarga:'',
    categoria:'',
    foto:'',
    fechaCreacion:'',
    estatus:'',
    cantidad:1,
    decoracion:0,
    subtotal:0
  }
  decoracion:any=[]
  envio:any=[]
  isGift=false

  constructor(public servicio:UserService, private location:Location, private carrito:CarritoService){}

  ngOnInit(): void {
    this.tem = this.location.path().split('/')
    this.servicio.verProducto(parseInt(this.tem[2])).subscribe({
        next: response=>{
          this.dataSource=response;
          this.asignarCampos(this.dataSource.Producto[0])
        },
    })
  }
  
  asignarCampos(dataSource:any){
    this.dataProducto.id=dataSource.idProducto
    this.dataProducto.nombre=dataSource.nombre
    this.dataProducto.precio=dataSource.precio
    this.dataProducto.descripcionLarga=dataSource.descripcionLarga
    this.dataProducto.descripcionCorta=dataSource.descripcionCorta
    this.dataProducto.categoria=dataSource.categoria[0]
    this.dataProducto.foto=dataSource.foto
    this.dataProducto.fechaCreacion=dataSource.fechaCreacion
    this.dataProducto.estatus=dataSource.estatus
  }
  changeCantidad(cant:number){
    if(this.dataProducto.cantidad+cant!=0){
      this.dataProducto.cantidad=this.dataProducto.cantidad+cant
    }
    
  }
  changeGift(){
    this.isGift=!this.isGift
  }
  onSubmit(){
    this.carrito.agregarCarrito(this.dataProducto.id, this.dataProducto.cantidad, this.decoracion, this.envio)
    this.dataProducto.cantidad=1
    window.location.reload()
  }
  recibirDatos(data:any){
    this.decoracion=data
  }
}
