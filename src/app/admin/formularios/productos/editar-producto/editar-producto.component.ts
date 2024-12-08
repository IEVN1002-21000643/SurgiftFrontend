import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { AdminService } from '../../../admin.service';
import { Productos } from '../../../../interface/productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})

export default class EditarProductoComponent implements OnInit{
  editarProducto!:FormGroup
  advertencia:string=''
  file: File | null = null
  estatus:string=''
  formData=new FormData()
  dataSource:any=[];
  tem:any;
  botonBorrar=false

  dataProducto:Productos={
    id:0,
    nombre:'',
    precio:0,
    descripcionCorta:'',
    descripcionLarga:'',
    categoria:'',
    foto:'',
    fechaCreacion:'',
    estatus:'',
    cantidad:0,
    decoracion:0,
    subtotal:0
  }

  constructor(private fb:FormBuilder, public servicio:AdminService, private location:Location, private router:Router){}

  ngOnInit(): void {
    this.editarProducto=this.initForm();
    this.tem = this.location.path().split('/')
    this.servicio.verProducto(parseInt(this.tem[3])).subscribe({
        next: response=>{
          this.dataSource=response;
          this.asignarCampos(this.dataSource.Producto[0])
        },
    })
  }
  
  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      descL: ['', Validators.required],
      descC: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      foto: [null, Validators.required],
    })
  }

  chageStatus(stat:string){
    this.estatus=stat
  }

  changeButton(){
    this.botonBorrar=!this.botonBorrar
  }
  
  asignarCampos(dataSource:any){
    this.dataProducto.id=dataSource.idProducto
    this.dataProducto.nombre=dataSource.nombre
    this.dataProducto.precio=dataSource.precio
    this.dataProducto.descripcionLarga=dataSource.descripcionLarga
    this.dataProducto.descripcionCorta=dataSource.descripcionCorta
    this.dataProducto.categoria=dataSource.categoria[0]
    this.dataProducto.foto=dataSource.foto
    this.dataProducto.fechaCreacion=dataSource.fechaCreacion
    this.dataProducto.estatus=dataSource.estatus

    if(this.dataProducto.estatus=='Papelera'){
      this.changeButton()
    }
  }

  onFileChange(event:any):void{
    this.file=event.target.files[0]
  }

  onSubmit(){
    this.dataProducto.estatus=this.estatus
    this.formData.append('nombre', this.dataProducto.nombre)
    this.formData.append('precio', String(this.dataProducto.precio))
    this.formData.append('descripcionLarga', this.dataProducto.descripcionLarga)
    this.formData.append('descripcionCorta', this.dataProducto.descripcionCorta)
    this.formData.append('categoria', this.dataProducto.categoria)
    if(this.file == null){
      this.formData.append('foto', this.dataProducto.foto)
    }else{
      this.formData.append('foto', this.file, this.file.name)
    }
    this.formData.append('estatus', this.dataProducto.estatus)
    this.editar()
  }

  editar(){
    this.servicio.modificarProducto(this.tem[3], this.formData).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>window.location.reload()
    })
  }
  eliminarProducto(){
    this.servicio.eliminarProducto(this.tem[3]).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>this.router.navigate(['usuario/pseudoperfil'])
    })
  }
}