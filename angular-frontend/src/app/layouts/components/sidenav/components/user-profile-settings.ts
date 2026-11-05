import { META_DATA } from '@/app/constants'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Icon } from '@app/components/icon/icon'
import { AuthService } from '@core/services/auth.service'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'user-profile-settings',
  imports: [Icon, RouterLink, NgbDropdownModule, TranslatePipe],
  template: `
    <div id="user-profile-settings" class="sidenav-user" style="background: url(assets/images/user-bg-pattern.svg)">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <a [routerLink]="[]" class="link-reset">
            <img src="assets/images/users/user-1.jpg" alt="user-image" class="rounded-circle mb-2 avatar-md" />
            <span class="sidenav-user-name fw-bold">{{ username }}</span>
          </a>
        </div>
        <div ngbDropdown>
          <a ngbDropdownToggle class="drop-arrow-none link-reset sidenav-user-set-icon" [routerLink]="[]">
            <app-icon icon="settings" class="fs-24 align-middle ms-1"></app-icon>
          </a>

          <div ngbDropdownMenu>
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">{{ 'user.welcome' | translate }}</h6>
            </div>

            <a [routerLink]="[]" ngbDropdownItem>
              <app-icon icon="user-circle" class="me-1 fs-lg align-middle"></app-icon>
              <span class="align-middle">{{ 'user.profile' | translate }}</span>
            </a>

            <a [routerLink]="[]" ngbDropdownItem>
              <app-icon icon="settings-2" class="me-1 fs-lg align-middle"></app-icon>
              <span class="align-middle">{{ 'user.accountSettings' | translate }}</span>
            </a>

            <a routerLink="/auth/lock-screen" ngbDropdownItem>
              <app-icon icon="lock" class="me-1 fs-lg align-middle"></app-icon>
              <span class="align-middle">{{ 'user.lockScreen' | translate }}</span>
            </a>

            <a [routerLink]="[]" (click)="logout()" ngbDropdownItem class="text-danger fw-semibold">
              <app-icon icon="logout" class="me-1 fs-lg align-middle"></app-icon>
              <span class="align-middle">{{ 'user.logout' | translate }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class UserProfileSettings {
  username = META_DATA.username

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout()
  }
}
