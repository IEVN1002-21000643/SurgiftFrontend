import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Usuarios } from '../../interface/usuarios';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { SesionService } from '../../auth/sesion.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export default class MiCuentaComponent {
  editarUsuario!:FormGroup
  advertencia:string=''
  file: File | null = null
  estatus:string=''
  formData=new FormData()
  dataSource:any=[];
  tem:any;

  dataUsuario:Usuarios={
    idUsuario:0,
    nombre:'',
    correo:'',
    direccion:'',
    fechaCreacion:'',
    foto:'',
    estatus:''
  }
  estado=''
  ciudad=''
  colonia=''
  calle=''
  cp=''
  numExt=''
  numInt=''

  constructor(private fb:FormBuilder, private router:Router, private sesion:SesionService, private user:UserService, private servicio:SesionService, private cliente:ClienteService){}

  ngOnInit(): void {
    this.editarUsuario=this.initForm();
    this.tem = this.servicio.getId()
    this.user.verUsuario(this.tem).subscribe({
        next: response=>{
          this.dataSource=response;
          this.asignarCampos(this.dataSource.Usuarios)
        },
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
      password: ['', [Validators.required, Validators.minLength(8),  Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)]],
      repetirContrasena: ['', [Validators.required, Validators.minLength(8),  Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)]],
      foto: [null, Validators.required],
      estatus: ['', Validators.required]
    })
  }

  chageStatus(stat:string){
    this.dataUsuario.estatus=stat
  }
  
  asignarCampos(dataSource:any){
    this.dataUsuario.idUsuario=dataSource.idUsuario
    this.dataUsuario.nombre=dataSource.nombre
    this.dataUsuario.correo=dataSource.correo
    this.dataUsuario.direccion=dataSource.direccion
    this.dataUsuario.foto=dataSource.foto
    this.dataUsuario.fechaCreacion=dataSource.fechaCreacion
    this.dataUsuario.estatus=dataSource.estatus

    const partes = this.dataUsuario.direccion.split(', ')
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

  onFileChange(event:any):void{
    this.file=event.target.files[0]
  }

  onSubmit(){
    this.formData.append('nombre', this.dataUsuario.nombre)
    this.formData.append('correo', String(this.dataUsuario.correo))
    let numeroInt=''
    if(this.numInt!=''){
      numeroInt=` num. Interior ${this.numInt},`
    }
    const direccionFormat=`C. ${this.calle} #${this.numExt},${numeroInt} ${this.colonia}, ${this.cp} ${this.ciudad}, ${this.estado}.`
    this.formData.append('direccion', direccionFormat)
    this.formData.append('fechaCreacion', this.dataUsuario.fechaCreacion)
    this.formData.append('estatus', this.dataUsuario.estatus)
    if(this.file == null){
      this.formData.append('foto', this.dataUsuario.foto)
    }else{
      this.formData.append('foto', this.file, this.file.name)
    }
    this.editar()
  }

  editar(){
    this.cliente.modificarUsuario(this.tem, this.formData).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>window.location.reload()
    })
  }
  eliminarUsuario(){
    this.dataUsuario.estatus='2'
    this.sesion.logout()
    this.router.navigate(['/auth/login'])
  }
}