import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-agregar-repartidor',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar-repartidor.component.html',
  styleUrl: './agregar-repartidor.component.css'
})
export default class AgregarRepartidorComponent implements OnInit {
  registroRepartidor!:FormGroup
  advertencia:string=''
  file: File | null = null
  estatus:string=''
  formData=new FormData()

  constructor(private fb:FormBuilder, public servicio:AdminService){}

  onFileChange(event:any):void{
    this.file=event.target.files[0]
  }

  ngOnInit(){
    this.registroRepartidor=this.initForm()
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      sueldo: ['', Validators.required],
      telefono: ['', Validators.required],
      compañia: ['', Validators.required],
      foto: [null]
    })
  }
  registrar(){
    this.servicio.agregarNuevoRepartidor(this.formData).subscribe({
      next:()=>console.log(),
      complete:()=>console.log(),
      error: (err)=> console.error(err)
    })
  }
  chageStatus(stat:string){
    this.estatus=stat
  }
  onSubmit(){
    const {nombre, sueldo, telefono, compañia, foto} = this.registroRepartidor.value
    if(this.registroRepartidor.invalid){
      this.advertencia='Alguno de los campos esta vacio'
    }else{
      this.advertencia=''
      this.formData.append('nombre', nombre)
      this.formData.append('sueldo', sueldo)
      this.formData.append('telefono', telefono)
      this.formData.append('compañia', compañia)
      this.formData.append('foto', this.file!, this.file!.name)
      this.formData.append('estatus', this.estatus)
      this.registrar()
    }
  }
}
