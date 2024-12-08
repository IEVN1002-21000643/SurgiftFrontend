import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export default class GraficasComponent implements OnInit{
  dataSoruce:any
  graficaX:any=[]
  graficaY:any=[]
  dataOrdenes:any=[]

  constructor(private admin:AdminService){}

  ngOnInit(): void {
    /*this.admin.verDatosOrdenes().subscribe({
      next: response=>{
        this.dataSoruce=response
        console.log(this.dataSoruce)
        for(let data of this.dataSoruce.Ordenes){
          this.graficaX.push(data.name)
          this.graficaY.push(data.value)
          this.dataOrdenes.push(data)
        }
      }
    })*/
  }
}
