import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { AdminService } from '../../../admin.service';
import { Usuarios } from '../../../../interface/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export default class EditarUsuarioComponent implements OnInit{
  editarUsuario!:FormGroup
  advertencia:string=''
  file: File | null = null
  estatus:string=''
  formData=new FormData()
  dataSource:any=[];
  tem:any;
  botonBorrar=false

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

  constructor(private fb:FormBuilder, public servicio:AdminService, private location:Location, private router:Router){}

  ngOnInit(): void {
    this.editarUsuario=this.initForm();
    this.tem = this.location.path().split('/')
    this.servicio.verUsuario(parseInt(this.tem[3])).subscribe({
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

  changeButton(){
    this.botonBorrar=!this.botonBorrar
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
    if(this.dataUsuario.estatus=='3'){
      this.changeButton()
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
    this.servicio.modificarUsuario(this.tem[3], this.formData).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>window.location.reload()
    })
  }
  eliminarUsuario(){
    this.servicio.eliminarUsuario(this.tem[3]).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>this.router.navigate(['admin/usuarios'])
    })
  }
}
