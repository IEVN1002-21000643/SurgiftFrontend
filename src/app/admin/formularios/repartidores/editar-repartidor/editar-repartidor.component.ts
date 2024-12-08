import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { AdminService } from '../../../admin.service';
import { Repartidor } from '../../../../interface/repartidor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-repartidor',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './editar-repartidor.component.html',
  styleUrl: './editar-repartidor.component.css'
})
export default class EditarRepartidorComponent implements OnInit{
  editarRepartidor!:FormGroup
  advertencia:string=''
  file: File | null = null
  estatus:string=''
  formData=new FormData()
  dataSource:any=[];
  tem:any;
  botonBorrar=false

  dataRepartidor:Repartidor={
    idRepartidor:0,
    nombre:'',
    sueldo:0,
    telefono:'',
    compania:'',
    foto:'',
    estatus:''
  }

  constructor(private fb:FormBuilder, public servicio:AdminService, private location:Location, private router:Router){}

  ngOnInit(): void {
    this.editarRepartidor=this.initForm();
    this.tem = this.location.path().split('/')
    this.servicio.verRepartidor(parseInt(this.tem[3])).subscribe({
        next: response=>{
          this.dataSource=response;
          this.asignarCampos(this.dataSource.Repartidor)
        },
    })
  }
  
  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', Validators.required],
      sueldo: ['', Validators.required],
      telefono: ['', Validators.required],
      compañia: ['', Validators.required],
      estatus: ['', Validators.required],
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
    console.log(dataSource)
    this.dataRepartidor.idRepartidor=dataSource.idRepartidor
    this.dataRepartidor.nombre=dataSource.nombre
    this.dataRepartidor.sueldo=dataSource.sueldo
    this.dataRepartidor.telefono=dataSource.telefono
    this.dataRepartidor.compania=dataSource.compania
    this.dataRepartidor.estatus=dataSource.estatus
    this.dataRepartidor.foto=dataSource.foto

    if(this.dataRepartidor.estatus=='Papelera'){
      this.changeButton()
    }
  }

  onFileChange(event:any):void{
    this.file=event.target.files[0]
  }

  onSubmit(){
    this.dataRepartidor.estatus=this.estatus
    this.formData.append('nombre', this.dataRepartidor.nombre)
    this.formData.append('sueldo', String(this.dataRepartidor.sueldo))
    this.formData.append('telefono', this.dataRepartidor.telefono)
    this.formData.append('compañia', this.dataRepartidor.compania)
    this.formData.append('estatus', this.dataRepartidor.estatus)
    if(this.file == null){
      this.formData.append('foto', this.dataRepartidor.foto)
    }else{
      this.formData.append('foto', this.file, this.file.name)
    }
    this.editar()
  }

  editar(){
    this.servicio.modificarRepartidor(this.tem[3], this.formData).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>window.location.reload()
    })
  }
  eliminarRepartidor(){
    this.servicio.eliminarRepartidor(this.tem[3]).subscribe({
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>this.router.navigate(['admin/repartidores'])
    })
  }
}
