import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SesionService } from '../sesion.service';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit{
  loginForm!:FormGroup
  dataSource:any

  constructor(private fb:FormBuilder, private servicio:SesionService, private router:Router, private location:Location){}

  ngOnInit(): void {
    this.loginForm=this.initForm()
  }
  initForm():FormGroup{
    return this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit(){
    if(this.loginForm.valid){
      const {correo, password} = this.loginForm.value
      const data={
        "correo": correo,
        "password": password
      }
      this.servicio.login(data).subscribe({
        next: response=>{
          this.dataSource=response
          this.servicio.setToken(this.dataSource.token)
          let role=this.servicio.getRole()
          if(role=='0'){
            this.location.go('/admin/dashboard');
            window.location.reload()
          }else{
            this.location.go('/');
            window.location.reload()
          }
        },
        error: ()=>console.log()
      })
    }
  }
}
