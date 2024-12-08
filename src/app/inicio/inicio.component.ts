import { Component } from '@angular/core';
import { CardProductoComponent } from '../plantillas/card-producto/card-producto.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CardProductoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export default class InicioComponent {

}
