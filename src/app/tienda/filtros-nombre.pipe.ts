import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrosNombre',
  standalone: true
})
export class FiltrosNombrePipe implements PipeTransform {

  transform(productos:any, filtro: string): any[] {
    if(!filtro){
      return productos
    }
    const filtroLower = filtro.toLowerCase()
    
    return productos.filter((product:any)=>{
      const nombre=product.nombre.toLowerCase()
      return nombre.includes(filtroLower)
    })
  }

}
