import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrosCategoria',
  standalone: true
})
export class FiltrosCategoriaPipe implements PipeTransform {

  transform(productos:any, filtro: string): any[] {
    if(!filtro){
      return productos
    }
    const filtroLower = filtro.toLowerCase()
    
    return productos.filter((product:any)=>{
      const categoria=product.categoria[0].toLowerCase()
      return categoria.includes(filtroLower)
    })
  }

}
