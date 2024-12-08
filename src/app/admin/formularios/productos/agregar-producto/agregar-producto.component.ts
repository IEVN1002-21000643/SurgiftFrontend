import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})

export default class AgregarProductoComponent implements OnInit {
  registroProducto!:FormGroup
  advertencia:string=''
  file: File | null = null
  estatus:string=''
  formData=new FormData()

  constructor(private fb:FormBuilder, public servicio:AdminService){}

  onFileChange(event:any):void{
    this.file=event.target.files[0]
  }

  ngOnInit(){
    this.registroProducto=this.initForm()
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      descL: [''],
      descC: [''],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      foto: [null],
    })
  }
  registrar(){
    this.servicio.agregarNuevoProducto(this.formData).subscribe({
      next:()=>console.log(),
      complete:()=>console.log(),
      error: (err)=> console.error(err)
    })
  }
  chageStatus(stat:string){
    this.estatus=stat
  }
  onSubmit(){
    const {nombre, descL, descC, categoria, precio, foto} = this.registroProducto.value
    if(this.registroProducto.invalid){
      this.advertencia='Alguno de los campos esta vacio'
    }else{
      this.advertencia=''
      this.formData.append('nombre', nombre)
      this.formData.append('descripcionLarga', descL)
      this.formData.append('descripcionCorta', descC)
      this.formData.append('categoria', categoria)
      this.formData.append('precio', precio)
      this.formData.append('foto', this.file!, this.file!.name)
      this.formData.append('estatus', this.estatus)
      this.registrar()
    }
  }
}
