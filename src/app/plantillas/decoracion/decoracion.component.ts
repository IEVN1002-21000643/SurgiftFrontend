import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-decoracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './decoracion.component.html',
  styleUrl: './decoracion.component.css'
})
export class DecoracionComponent implements OnInit{
  decoracion=''
  costoDecoracion:number=0
  isEmpaque=''
  isListon=''
  isRelleno=''
  empaqueStyle:any=[]
  listonStyle:any=[]
  rellenoStyle:any=[]
  costoEmpaque:number=0
  costoListon:number=0
  costoRelleno:number=0
  decoForm!: FormGroup

  constructor(private fb:FormBuilder){}

  @Output() hijoEvento = new EventEmitter<any>();

  ngOnInit(): void {
    this.decoForm=this.initForm()
  }

  initForm(){
    return this.fb.group({
      empaque: [''],
      colorEmpaque: [''],
      tamanoEmpaque: [''],
      liston: [''],
      colorListon: [''],
      tamanoListon: [''],
      relleno: [''],
      colorRelleno: [''],
      nombreRelleno: ['']
    })
  }

  changeEmpaque(tipo:string){
    this.isEmpaque=tipo
    if(tipo=='caja'){
      this.empaqueStyle=[{"tamano": "Chico 25x25x13", "precio":15}, {"tamano": "Mediano 30x30x15", "precio":30}, {"tamano": "Grande 41x41x10", "precio":50}]
    }
    if(tipo=='bolsa'){
      this.empaqueStyle=[{"tamano": "Chico 20x11x26", "precio":15}, {"tamano": "Mediano 25x13x33", "precio":20}, {"tamano": "Grande 41x15x30", "precio":25}]
    }
  }
  changeListon(tipo:string){
    this.isListon=tipo
    this.listonStyle=[{"tamano": "Delgado", "precio": 3},{"tamano": "Grueso", "precio": 6}]
  }
  changeRelleno(tipo:string){
    this.isRelleno=tipo
    this.rellenoStyle=[{"nombre": "Confetti", "precio":10}, {"nombre": "Papel", "precio":18}]
  }
  precioEmpaque(pre:number){this.costoEmpaque=pre}
  precioListon(pre:number){this.costoListon=pre}
  precioRelleno(pre:number){this.costoRelleno=pre}

  onSubmit(){
    const {empaque, colorEmpaque, tamanoEmpaque, liston, colorListon, tamanoListon, relleno, colorRelleno, nombreRelleno}=this.decoForm.value
    let decoEmpaque=''
    let decoListon=''
    let decoRelleno=''
    if(empaque!=''){decoEmpaque=`${empaque} color: ${colorEmpaque} de tamaño ${tamanoEmpaque}`}
    if(liston!=''){decoListon=`, Liston color: ${colorListon} de tamaño ${tamanoListon}`}
    if(relleno!=''){decoRelleno=`, ${nombreRelleno} color: ${colorRelleno}`}
    this.decoracion=decoEmpaque+decoListon+decoRelleno
    this.costoDecoracion=this.costoEmpaque+this.costoListon+this.costoRelleno

    this.hijoEvento.emit([this.decoracion, this.costoDecoracion]);
  }

}
