import { META_DATA } from '@/app/constants'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Icon } from '@app/components/icon/icon'
import { AuthService } from '@core/services/auth.service'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

type UserProfileMenuType = {
  icon: string
  label: string
  href: string
  className?: string
  isDivider?: boolean
  action?: string
}

@Component({
  selector: 'simple-user-dropdown',
  imports: [Icon, RouterLink, NgbDropdownModule, TranslatePipe],
  template: `
    <div id="simple-user-dropdown" class="topbar-item nav-user">
      <div ngbDropdown placement="bottom-end">
        <a class="topbar-link dropdown-toggle drop-arrow-none" [routerLink]="[]" ngbDropdownToggle>
          <img src="assets/images/users/user-1.jpg" width="32" class="rounded-circle me-lg-2 d-flex" alt="user-image" />
          <div class="d-lg-flex align-items-center gap-1 d-none">
            <h5 class="my-0">{{ username }}</h5>
            <app-icon icon="chevron-down" class="align-middle"></app-icon>
          </div>
        </a>
        <div ngbDropdownMenu class="dropdown-menu-end">
          <!-- Header -->
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">{{ 'user.welcome' | translate }}</h6>
          </div>

          @for (item of userProfileMenuData; track item.label) {
            <a [routerLink]="item.href" ngbDropdownItem [class]="item.className" (click)="handleClick(item)">
              <app-icon [icon]="item.icon" class="me-1 fs-lg align-middle"></app-icon>

              <span class="align-middle">{{ item.label | translate }}</span>
            </a>

            @if (item.isDivider) {
              <div class="dropdown-divider"></div>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SimpleUserDropdown {
  username = META_DATA.username

  constructor(private auth: AuthService) {}

  userProfileMenuData: UserProfileMenuType[] = [
    {
      icon: 'user-circle',
      label: 'user.profile',
      href: '',
    },
    {
      icon: 'settings-2',
      label: 'user.accountSettings',
      href: '',
      isDivider: true,
    },
    {
      icon: 'lock',
      label: 'user.lockScreen',
      href: '/auth/lock-screen',
    },
    {
      icon: 'logout',
      label: 'user.logout',
      href: '',
      action: 'logout',
      className: 'fw-semibold text-danger',
    },
  ]

  handleClick(item: UserProfileMenuType) {
    if (item.action === 'logout') {
      this.auth.logout()
    }
  }
}
