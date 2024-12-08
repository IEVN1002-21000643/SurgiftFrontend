import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})
export default class OrdenesComponent implements OnInit{
  dataSource:any
  dataOrden:any

  constructor(private admin:AdminService){}

  ngOnInit(): void {
    this.admin.verOrdenes().subscribe({
      next: response=>{
        this.dataSource=response
        this.dataOrden=this.dataSource.Ordenes
      }
    })
  }
}
