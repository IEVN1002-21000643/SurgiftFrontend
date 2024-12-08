import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export default class UsuariosComponent implements OnInit{
  listaUsuarios:any=[]
  usuarioDisponible:any=[]
  usuarioPapelera:any=[]
  showTodos=true
  showPapelera=false
  dataSource:any=[]
  formData= new FormData()
  
  constructor(public servicio:AdminService){}
  
  ngOnInit(): void {
    this.servicio.verUsuarios().subscribe({
      next: response=>{
        this.listaUsuarios=response
        for(let usuario of this.listaUsuarios.Usuarios){
          if(usuario.estatus!='Papelera'){
            this.usuarioDisponible.push(usuario)
          }if(usuario.estatus=='Papelera'){
            this.usuarioPapelera.push(usuario)
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
    this.servicio.verUsuario(id).subscribe({
      next: response=>{
        this.dataSource=response;
        this.formData.append('nombre', this.dataSource.Usuarios.nombre)
        this.formData.append('correo', String(this.dataSource.Usuarios.correo))
        this.formData.append('direccion', this.dataSource.Usuarios.direccion)
        this.formData.append('fechaCreacion', this.dataSource.Usuarios.fechaCreacion)
        this.formData.append('estatus', estatus)
        this.formData.append('foto', this.dataSource.Usuarios.foto)
        this.servicio.modificarUsuario(id, this.formData).subscribe({
          next: ()=>console.log()
        })
      },
      error: (error)=>console.log(error),
      complete: ()=> window.location.reload()
  })
  }

  eliminarUsuario(id:number){
    this.servicio.eliminarUsuario(id).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>window.location.reload()
    })
  }
}
