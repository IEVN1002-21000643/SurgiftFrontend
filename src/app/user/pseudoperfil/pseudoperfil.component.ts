import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { CommonModule } from '@angular/common';
import { SesionService } from '../../auth/sesion.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-pseudoperfil',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pseudoperfil.component.html',
  styleUrl: './pseudoperfil.component.css'
})
export default class PseudoperfilComponent implements OnInit{
  dataSource:any
  pseudoData:any=[]
  idUsuario:string|null=''
  dataUser:any

  constructor(private cliente:ClienteService, private sesion:SesionService, private usuario:UserService){}

  ngOnInit(): void {
    this.idUsuario=this.sesion.getId()
    this.cliente.verPseudos(Number(this.idUsuario)).subscribe({
      next: response=>{
        this.dataSource=response
        this.obternerInfo(this.dataSource.Pseudoperfil)
      }
    })
  }
  obternerInfo(dataSource:any){
    for(let pseudo of dataSource){
      if(pseudo['PseudoperfilReal'] != null){
        this.usuario.verUsuario(pseudo['PseudoperfilReal']).subscribe({
          next: response=>{
            this.dataUser=response
            pseudo.nombreReal=this.dataUser.Usuarios.nombre
          }
        })
      }
      this.pseudoData.push(pseudo)
    }
  }
}
