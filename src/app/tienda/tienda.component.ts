import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { CarritoService } from '../carrito.service';
import { FormsModule } from '@angular/forms';
import { FiltrosNombrePipe } from './filtros-nombre.pipe';
import { FiltrosCategoriaPipe } from './filtros-categoria.pipe';
import { FiltrosPrecioPipe } from './filtros-precio.pipe';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FiltrosNombrePipe, FiltrosCategoriaPipe, FiltrosPrecioPipe],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export default class TiendaComponent {
  listaProductos:any=[]
  listaPublicado:any=[]
  showTodos=true
  showPapelera=false
  filtroNombre=''
  filtroCategoria=''
  filtroPrecioMenor=1000000
  filtroPrecioMayor=0
  constructor(public productos:UserService, private carrito:CarritoService){}

  ngOnInit(): void {
    this.productos.verProductos().subscribe({
      next: response=>{
        this.listaProductos=response
        for(let producto of this.listaProductos.Productos){
          if(producto.estatus=='Publicado'){
            this.listaPublicado.push(producto)
          }
        }
      },
      error: (error)=>console.log(error)
    })
  }
  agregarCarrito(idProducto:number, cantidad:number){
    const decoracion=['',0]
    const envio=['','']
    this.carrito.agregarCarrito(idProducto, cantidad, decoracion, envio)
  }
  evitarPropagacion(event:Event):void{
    event.stopPropagation()
  }
}
