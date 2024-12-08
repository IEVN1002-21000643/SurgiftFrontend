import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from '../sesion.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export default class SignupComponent implements OnInit{
  formRegistro!:FormGroup
  aviso:string=''
  file: File | null = null
  formData=new FormData()

  constructor(private fb:FormBuilder, public register:SesionService, private router:Router){}

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
      foto: [null]
    })
  }
  registrar(){
    this.register.agregarNuevoUsuario(this.formData).subscribe({
      next:()=>console.log(),
      complete:()=>this.router.navigate(['auth/login']),
      error: (err)=> console.error(err)
    })

  }
  onSubmit():void{
    const {nombre, correo, estado, ciudad, colonia, calle, cp, numInt, numExt, password, repetirContrasena, foto} = this.formRegistro.value
    if(this.formRegistro.invalid){
      this.aviso='Atención todos los campos deben ser llenados'
    }
    else{
      if(password != repetirContrasena){
        this.aviso='Atención la contraseña debe ser la misma'
      }else{
        this.aviso=''
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
        this.registrar()
      }
    }

  }
}
