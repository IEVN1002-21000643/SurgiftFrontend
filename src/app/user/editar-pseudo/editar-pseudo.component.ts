import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Location, NgTemplateOutlet } from '@angular/common';
import { SesionService } from '../../auth/sesion.service';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-pseudo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-pseudo.component.html',
  styleUrl: './editar-pseudo.component.css'
})
export default class EditarPseudoComponent implements OnInit{
  dataSource:any
  pseudoData:any={}
  tem:any
  idUser:any
  formPseudo!:FormGroup

  constructor(private fb:FormBuilder, private router:Router, private cliente:ClienteService, private location:Location, private sesion:SesionService){}

  ngOnInit(): void {
    this.tem=this.location.path().split('/')
    this.idUser=this.sesion.getId()
    this.formPseudo=this.initForm()
    this.cliente.verPseudo(this.tem[3], this.idUser).subscribe({
      next: response=>{
        this.dataSource=response
        this.pseudoData.idPseudoperfil=this.dataSource[0].idPseudoperfil
        this.pseudoData.nombre=this.dataSource[0].nombre
        this.pseudoData.caracteristicas=this.dataSource[0].Caracteristícas
        this.pseudoData.usuarioReal=this.dataSource[0].idPseudoperfilReal
        this.pseudoData.idUsuario=this.dataSource[0].idUsuario
      }
    })
  }

  initForm(){
    return this.fb.group({
      nombre: ['', Validators.required],
      caracteristicas: ['', Validators.required],
      usuarioReal: ['']
    })
  }

  onSubmit(){
    this.cliente.editarPseudo(this.pseudoData).subscribe()
    window.location.reload()
  }
  borrarPseudoperfil(){
    this.cliente.eliminarPseudo(this.pseudoData.idPseudoperfil, this.pseudoData.idUsuario).subscribe({
      next: ()=>console.log(),
      complete: ()=>this.router.navigate(['usuario/pseudoperfil'])
    }
    )
  }
}
