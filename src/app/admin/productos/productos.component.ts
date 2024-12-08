import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class ProductosComponent implements OnInit{
  listaProductos:any=[]
  productoDisponible:any=[]
  productoPapelera:any=[]
  showTodos=true
  showPapelera=false
  dataSource:any=[]
  formData= new FormData()
  constructor(public productos:AdminService){}

  ngOnInit(): void {
    this.productos.verProductos().subscribe({
      next: response=>{
        this.listaProductos=response
        for(let producto of this.listaProductos.Productos){
          if(producto.estatus!='Papelera'){
            this.productoDisponible.push(producto)
          }else{
            this.productoPapelera.push(producto)
          }
        }
      },
      error: (error)=>console.log(error)
    })
  }
  verTodos(): void{
    this.showTodos=true
    this.showPapelera=false
  }
  verPapelera():void{
    this.showTodos=false
    this.showPapelera=true
  }

  changeEstatus(id:number, estatus:string){
    this.productos.verProducto(id).subscribe({
      next: response=>{
        this.dataSource=response;
        this.formData.append('nombre', this.dataSource.Producto[0].nombre)
        this.formData.append('precio', String(this.dataSource.Producto[0].precio))
        this.formData.append('descripcionLarga', this.dataSource.Producto[0].descripcionLarga)
        this.formData.append('descripcionCorta', this.dataSource.Producto[0].descripcionCorta)
        this.formData.append('categoria', this.dataSource.Producto[0].categoria)
        this.formData.append('foto', this.dataSource.Producto[0].foto)
        this.formData.append('estatus', estatus)
        this.productos.modificarProducto(id, this.formData).subscribe({
          next: ()=>console.log()
        })
      },
      error: (error)=>console.log(error),
      complete: ()=> window.location.reload()
  })
  }

  eliminarProducto(id:number){
    this.productos.eliminarProducto(id).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>window.location.reload()
    })
  }
}
