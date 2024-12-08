import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionService } from '../sesion.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private servicio: SesionService, private router: Router, private location:Location) {}

  canActivate(): boolean {
    if (this.servicio.isLoggedIn()) {
      if(this.servicio.getRole()=='0'){
        return true
      }else if(this.servicio.getRole()=='1'){
        return true
      }else{
        this.router.navigate(['/'])
        return false
      }
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}

