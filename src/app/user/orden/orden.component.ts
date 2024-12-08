import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { SesionService } from '../../auth/sesion.service';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.css'
})
export default class OrdenComponent implements OnInit{
  dataSource:any
  dataOrden:any={}
  tem:any
  idUser:any

  constructor(private orden:ClienteService, private servicio:SesionService, private location:Location, private router:Router){}

  ngOnInit(): void {
    this.idUser=this.servicio.getId()
    this.tem=this.location.path().split('/')
    this.orden.verOrden(this.tem[3], this.idUser).subscribe({
      next: response=>{
        this.dataSource=response
        for(let producto of this.dataSource.Ordenes[0].productos){
          producto.subtotal=producto.cantidad*producto.precio
        }
      }
    })
  }
  cancelarPedido(){
    this.dataOrden.idOrden=this.dataSource.Ordenes[0].idOrden
    this.dataOrden.nombre=this.dataSource.Ordenes[0].nombre
    this.dataOrden.direccion=this.dataSource.Ordenes[0].direccion
    this.dataOrden.telefono=this.dataSource.Ordenes[0].telefono
    this.dataOrden.correo=this.dataSource.Ordenes[0].correo
    this.dataOrden.destinatario=this.dataSource.Ordenes[0].destinatario
    this.dataOrden.fechaPedido=this.dataSource.Ordenes[0].fechaPedido
    this.dataOrden.total=this.dataSource.Ordenes[0].total
    this.dataOrden.estatus=0
    this.dataOrden.idUsuario=this.idUser
    this.orden.cancelarOrden(this.tem[3],this.dataOrden).subscribe({
      next:()=>this.router.navigate(['/usuario/misPedidos'])
    })
    
  }
}
