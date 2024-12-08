import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CarritoService } from '../../carrito.service';
import { UserService } from '../../user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export default class CalendarioComponent implements OnInit{
  formEnvio!:FormGroup
  hoy=new Date()
  anio=this.hoy.getFullYear()
  mes=this.hoy.getMonth()
  dia=this.hoy.getDate()
  nombreMes=this.hoy.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase()
  semanas:any[][]=[]
  diaSelect:any=''
  productos:any
  listaProducto:any=[]
  envio:any=[]
  nombre=''
  decoracion:any=[]

  constructor(private fb:FormBuilder, private carrito:CarritoService, private user:UserService){}

  ngOnInit(): void {
    this.formEnvio=this.initForm()
    this.generarCalendario(this.anio, this.mes)
    this.productos=this.carrito.verCarrito()
    if(this.productos!=null){
      for(let p of this.productos){
        if(p.decoracion!='' && p.destinatario==''){
          this.decoracion.push(p.decoracion)
          this.decoracion.push(p.precioDeco)
          this.user.verProducto(p.idProducto).subscribe({
            next: response=>{
              const productos:any=response
              productos.Producto[0].cantidad=p.cantidad
              productos.Producto[0].decoracion=p.decoracion
              this.listaProducto.push(productos.Producto)
            }
          })
        }
      }
    }
  }

  initForm(){
    return this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  generarCalendario(anio:number, mes:number){
    let diaUno = 1 - new Date(anio, mes, 1).getDay()
    const diasMes= new Date(anio, mes+1, 0).getDate()
    for(let semana=0; semana<6; semana++){
      const dias:any=[]
      for(let i=0; i<7; i++){
        if(diaUno > 0 && diaUno <= diasMes){
          if(diaUno==this.dia){
            dias.push({dia: diaUno, estilo: "box-shadow: inset 0px 0px 0px 4px #c6e0fa; background-color: #e7f3ff"})
          }else{
            dias.push({dia: diaUno, estilo: "box-shadow: inset 0px 0px 0px 0px #fff; background-color: #fff"})
          }
        }else{
          dias.push({dia: '', estilo: "box-shadow: inset 0px 0px 0px 0px #fff; background-color: #fff"})
        }
        diaUno++
      }
      this.semanas.push(dias)
    }
  }

  onClickDay(dia:any){
    const seleccion=new Date(this.anio, this.mes, dia.dia-1)
    if(seleccion>=this.hoy){
      this.diaSelect = new Date(this.anio, this.mes, dia.dia)
      for(let semana of this.semanas){
        for(let day of semana){
          day.estilo="box-shadow: inset 0px 0px 0px 0px #fff; background-color: #fff"
          if(dia.dia==day.dia){
            day.estilo="box-shadow: inset 0px 0px 0px 4px #6aa9e8; background-color: #95C5F5"
          }
        }  
      }
    }
  }

  onSubmit(){
    if(this.nombre!='' && this.diaSelect!=''){
      this.envio.push(this.nombre)
      this.envio.push(this.diaSelect)
      console.log(this.decoracion)
      for(let p of this.listaProducto){
        this.carrito.agregarCantidad(p[0].idProducto, p[0].cantidad, this.decoracion, this.envio)
      }
      window.location.reload()
    }
  }
}
