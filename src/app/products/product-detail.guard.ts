import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      const idAsString = route.paramMap.get('id'); 
      const id = Number(idAsString);
      if (isNaN(id) || id < 1) {
        console.error(`Invalid product id: ${idAsString}`);
        this.router.navigate(['/products']);
        return false;
      }
    return true;
  }  
}
