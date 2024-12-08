import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { SesionService } from '../../auth/sesion.service';

@Component({
  selector: 'app-agregar-pseudo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-pseudo.component.html',
  styleUrl: './agregar-pseudo.component.css'
})
export default class AgregarPseudoComponent implements OnInit{
  formPseudo!:FormGroup
  data:any={}

  constructor(private fb:FormBuilder, private cliente:ClienteService, private sesion:SesionService){}

  ngOnInit(): void {
    this.formPseudo=this.initForm()
    this.data.idUsuario=this.sesion.getId()
  }

  initForm(){
    return this.fb.group({
      nombre: ['', Validators.required],
      caracteristicas: ['', Validators.required],
      usuarioReal: ['']
    })
  }

  onSubmit(){
    if(this.formPseudo.valid){
      const {nombre, caracteristicas, usuarioReal} = this.formPseudo.value
      this.data.nombre=nombre
      this.data.caracteristicas=caracteristicas
      if(usuarioReal){
        this.data.usuarioReal=usuarioReal
      }else{
        this.data.usuarioReal=''
      }
      this.cliente.crearPseudo(this.data).subscribe({
        complete: ()=>{
          this.formPseudo.get('nombre')?.setValue('')
          this.formPseudo.get('caracteristicas')?.setValue('')
          this.formPseudo.get('usuarioReal')?.setValue('')
        }
      })
    }
  }
}
