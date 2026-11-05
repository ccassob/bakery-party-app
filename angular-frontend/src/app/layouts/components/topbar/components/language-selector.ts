import { Component, inject } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { TranslateService } from '@ngx-translate/core'

type LanguageType = {
  code: string
  name: string
  flag: string
}

@Component({
  selector: 'language-selector',
  imports: [NgbDropdownModule],
  template: `
    <div id="language-selector" class="topbar-item">
      <div ngbDropdown placement="bottom-end">
        <button class="topbar-link fw-bold drop-arrow-none" ngbDropdownToggle type="button">
          <img [src]="selectedLanguage.flag" alt="flag" class="rounded me-2" height="18" />
          <span id="selected-language-code">{{ selectedLanguage.code.toUpperCase() }}</span>
        </button>
        <div ngbDropdownMenu class="dropdown-menu-end">
          @for (language of languages; track language.code) {
            <button ngbDropdownItem (click)="selectLanguage(language)" [title]="language.name">
              <img [src]="language.flag" [alt]="language.name" class="me-1 rounded" height="18" />
              <span class="align-middle">{{ language.name }}</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class LanguageSelector {
  private translate = inject(TranslateService)

  languages: LanguageType[] = [
    { code: 'en', name: 'English', flag: 'assets/images/flags/us.svg' },
    { code: 'es', name: 'Español', flag: 'assets/images/flags/es.svg' },
  ]

  selectedLanguage: LanguageType =
    this.languages.find((l) => l.code === this.translate.getCurrentLang()) ?? this.languages[0]

  selectLanguage(language: LanguageType) {
    this.selectedLanguage = language
    this.translate.use(language.code)
  }
}
