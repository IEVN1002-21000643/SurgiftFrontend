import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-orden',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-orden.component.html',
  styleUrl: './editar-orden.component.css'
})
export default class EditarOrdenComponent implements OnInit{
  tem:any
  estado=''
  ciudad=''
  colonia=''
  calle=''
  cp=''
  numExt=''
  numInt=''
  dataSource:any
  dataOrden:any={}
  ordenFrom!:FormGroup
  constructor(private fb:FormBuilder, private admin:AdminService, private location:Location){}

  ngOnInit(): void {
    this.tem=this.location.path().split('/')
    this.admin.verOrden(this.tem[3]).subscribe({
      next: response=>{
        this.dataSource=response;
        this.asignarCampos(this.dataSource.Ordenes[0])
      }
    })
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      ciudad: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      cp: ['', Validators.required],
      numInt: [''],
      numExt: ['', Validators.required],
      telefono: ['', Validators.required],
      destinatario: ['']
    })
  }
  asignarCampos(dataSource:any){
    console.log(dataSource)
    this.dataOrden.idOrden=dataSource.idOrden
    this.dataOrden.nombre=dataSource.nombre
    this.dataOrden.correo=dataSource.correo
    this.dataOrden.direccion=dataSource.direccion
    this.dataOrden.productos=dataSource.productos
    this.dataOrden.fechaPedido=dataSource.fechaPedido
    this.dataOrden.telefono=dataSource.telefono
    this.dataOrden.destinatario=dataSource.destinatario
    this.dataOrden.total=dataSource.total
    if(dataSource.idUsuario!=''){
      this.dataOrden.idUsuario=dataSource.idUsuario
    }
    if(dataSource.estatus=='Cancelado'){
      this.dataOrden.estatus=0
    }
    if(dataSource.estatus=='Proceso'){
      this.dataOrden.estatus=1
    }
    if(dataSource.estatus=='En envio'){
      this.dataOrden.estatus=2
    }
    if(dataSource.estatus=='Entregado'){
      this.dataOrden.estatus=3
    }

    const partes = this.dataOrden.direccion.split(', ')
    if(partes.length == 4){
      this.estado=partes[3].replace('.', '')
      this.ciudad=partes[2].split(' ')[1]
      this.colonia=partes[1]
      this.calle=partes[0].split(' ')[1]
      this.cp=partes[2].split(' ')[0]
      this.numExt=partes[0].split(' ')[2].replace('#','')
      this.numInt=''
    }else{
      this.estado=partes[4].replace('.', '')
      this.ciudad=partes[3].split(' ')[1]
      this.colonia=partes[2]
      this.calle=partes[0].split(' ')[1]
      this.cp=partes[3].split(' ')[0]
      this.numExt=partes[0].split(' ')[2].replace('#','')
      this.numInt=partes[1].split(' ')[2]
    }
  }

  OnSubmit(){
    let numeroInt=''
        if(this.numInt!=''){
          numeroInt=` num. Interior ${this.numInt},`
        }
        const direccionFormat=`C. ${this.calle} #${this.numExt},${numeroInt} ${this.colonia}, ${this.cp} ${this.ciudad}, ${this.estado}.`
        this.dataOrden.direccion=direccionFormat

        this.admin.modificarOrden(this.dataOrden.idOrden, this.dataOrden).subscribe({
          complete:()=>{
            window.location.reload()
          }
        })
      }
}
