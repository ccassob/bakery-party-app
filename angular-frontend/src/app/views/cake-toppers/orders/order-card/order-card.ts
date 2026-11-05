import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { TopperOrder } from '../../cake-toppers.service'
import { effectiveStatus, formatDate } from '../order-utils'

@Component({
  selector: 'app-order-card',
  imports: [TranslatePipe],
  templateUrl: './order-card.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderCard {
  order = input.required<TopperOrder>()
  /** Only client name and description (week calendar, where the day column already gives the date). */
  compact = input(false)
  edit = output<TopperOrder>()

  readonly effectiveStatus = effectiveStatus
  readonly formatDate = formatDate
}
