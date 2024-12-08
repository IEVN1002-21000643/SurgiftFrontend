import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit{
  dataSource:any
  totalVenta:number=0
  numUsuario:number=0
  numOrdenes:number=0
  promProducto:number=0
  promVenta:number=0

  constructor(private admin: AdminService){}

  ngOnInit(): void {
    this.admin.verTotalVenta().subscribe({
      next: response=> {
        this.dataSource=response
        this.totalVenta=this.dataSource.grafica
      }
    })
    this.admin.verNumUsuarios().subscribe({
      next: response=> {
        this.dataSource=response
        this.numUsuario=this.dataSource.grafica
      }
    })
    this.admin.verNumOrdenes().subscribe({
      next: response=> {
        this.dataSource=response
        this.numOrdenes=this.dataSource.grafica
      }
    })
    this.admin.verPromProducto().subscribe({
      next: response=> {
        this.dataSource=response
        this.promProducto=this.dataSource.grafica
      }
    })
    this.admin.verPromVenta().subscribe({
      next: response=> {
        this.dataSource=response
        this.promVenta=this.dataSource.grafica
      }
    })
  }
}
