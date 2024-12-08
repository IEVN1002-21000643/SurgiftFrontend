import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { CarritoService } from '../../carrito.service';

@Component({
  selector: 'app-card-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css'
})
export class CardProductoComponent {
  listaProductos:any=[]
  listaPublicado:any=[]
  showTodos=true
  showPapelera=false
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
