import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { SesionService } from '../../auth/sesion.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})
export default class MisPedidosComponent implements OnInit{
  dataSource:any
  listaOrdenes:any=[]
  idUser:any

  constructor(private usuario:ClienteService, private sesion:SesionService){}

  ngOnInit(): void {
    this.idUser=this.sesion.getId()
    this.usuario.verOrdenes(this.idUser).subscribe({
      next:response=>{
        this.dataSource=response
        for(let orden of this.dataSource.Ordenes){
          this.listaOrdenes.push(orden)
        }
      }
    })
  }
}
