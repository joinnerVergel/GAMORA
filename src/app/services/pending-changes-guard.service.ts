import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuardService implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    
    return component.canDeactivate() ?
      true :
      confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
  }

}