import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrosPrecio',
  standalone: true
})
export class FiltrosPrecioPipe implements PipeTransform {

  transform(productos:any, mayor: number, menor:number): any[] {
    if(!mayor || !menor){
      return productos
    }
    
    return productos.filter((product:any)=>{
      const precio=product.precio
      return precio>=mayor && precio<=menor
    })
  }

}
