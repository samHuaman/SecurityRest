import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        let currentRoute = this.router.url;
        console.log(currentRoute);

        this.router.navigate(['/login']);/*, { queryParams: { returnUrl: state.url }}*/
        return false;
    }
}