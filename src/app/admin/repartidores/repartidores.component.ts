import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-repartidores',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './repartidores.component.html',
  styleUrl: './repartidores.component.css'
})
export default class RepartidoresComponent {
  listaRepartidores:any=[]
  repartidoresDisponible:any=[]
  repartidoresPapelera:any=[]
  showTodos=true
  showPapelera=false
  dataSource:any=[]
  formData= new FormData()
  constructor(public servicio:AdminService){}

  ngOnInit(): void {
    this.servicio.verRepartidores().subscribe({
      next: response=>{
        this.listaRepartidores=response
        for(let repartidor of this.listaRepartidores.Repartidores){
          if(repartidor.estatus!='Papelera'){
            this.repartidoresDisponible.push(repartidor)
          }else{
            this.repartidoresPapelera.push(repartidor)
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
    this.servicio.verRepartidor(id).subscribe({
      next: response=>{
        this.dataSource=response;
        this.formData.append('nombre', this.dataSource.Repartidor.nombre)
        this.formData.append('sueldo', String(this.dataSource.Repartidor.sueldo))
        this.formData.append('telefono', this.dataSource.Repartidor.telefono)
        this.formData.append('compañia', this.dataSource.Repartidor.compania)
        this.formData.append('foto', this.dataSource.Repartidor.foto)
        this.formData.append('estatus', estatus)
        this.servicio.modificarRepartidor(id, this.formData).subscribe({
          next: ()=>console.log()
        })
      },
      error: (error)=>console.log(error),
      complete: ()=> window.location.reload()
  })
  }

  eliminarRepartidor(id:number){
    this.servicio.eliminarRepartidor(id).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>window.location.reload()
    })
  }
}
