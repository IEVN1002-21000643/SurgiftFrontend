import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export default class AgregarUsuarioComponent implements OnInit {
  formRegistro!:FormGroup
  advertencia:string=''
  file: File | null = null
  formData=new FormData()

  constructor(private fb:FormBuilder, public sesion:AdminService, private router:Router){}

  onFileChange(event:any):void{
    this.file=event.target.files[0]
  }

  ngOnInit(){
    this.formRegistro=this.initForm()
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
      foto: [null],
      estatus: ['']
    })
  }
  registrar(){
    this.sesion.agregarNuevoUsuario(this.formData).subscribe({
      next:()=>console.log(),
      complete:()=>{
        this.formRegistro.get('nombre')?.setValue('')
        this.formRegistro.get('correo')?.setValue('')
        this.formRegistro.get('estado')?.setValue('')
        this.formRegistro.get('ciudad')?.setValue('')
        this.formRegistro.get('colonia')?.setValue('')
        this.formRegistro.get('calle')?.setValue('')
        this.formRegistro.get('cp')?.setValue('')
        this.formRegistro.get('numInt')?.setValue('')
        this.formRegistro.get('numExt')?.setValue('')
        this.formRegistro.get('password')?.setValue('')
        this.formRegistro.get('repetirContrasena')?.setValue('')
        this.formRegistro.get('foto')?.setValue('')
        this.formRegistro.get('estatus')?.setValue('')
      },
      error: (err)=> console.error(err)
    })

  }
  onSubmit():void{
    const {nombre, correo, estado, ciudad, colonia, calle, cp, numInt, numExt, password, repetirContrasena, foto, estatus} = this.formRegistro.value
    if(this.formRegistro.invalid){
      this.advertencia='Atención todos los campos deben ser llenados'
    }
    else{
      if(password != repetirContrasena){
        this.advertencia='Atención la contraseña debe ser la misma'
      }
      else{
        this.advertencia=''
        let numeroInt=''
        if(numInt!=''){
          numeroInt=` num. Interior ${numInt},`
        }
        const direccionFormat=`C. ${calle} #${numExt},${numeroInt} ${colonia}, ${cp} ${ciudad}, ${estado}.`
        
        this.formData.append('nombre', nombre)
        this.formData.append('correo', correo)
        this.formData.append('password', password)
        this.formData.append('direccion', direccionFormat)
        this.formData.append('foto', this.file!, this.file!.name)
        this.formData.append('estatus', estatus)
        this.registrar()
      }
    }

  }
}
