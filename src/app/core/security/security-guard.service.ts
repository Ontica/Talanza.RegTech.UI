import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { PrincipalService } from './principal.service';

@Injectable()
export class SecurityGuardService implements CanActivate {

  constructor(private router: Router, private principal: PrincipalService) { }

  canActivate() {   
    if (!this.principal.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
