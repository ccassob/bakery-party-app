import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { CakeToppersService, TopperOrder, TopperOrderStatus } from '../../cake-toppers.service'
import { OrderCard } from '../order-card/order-card'
import { OrderModals } from '../order-modals'
import { addDays, columnClass, fromIso, isIso, mondayOf, STATUS_COLUMNS, statusKey, todayIso } from '../order-utils'

@Component({
  selector: 'app-cake-toppers-day',
  imports: [FormsModule, RouterLink, TranslatePipe, CdkDropListGroup, CdkDropList, CdkDrag, OrderCard],
  templateUrl: './day-view.html',
  styles: `
    .kanban-list { min-height: 120px; max-height: calc(100vh - 360px); overflow-y: auto; }
    .kanban-card { cursor: grab; }
    .cdk-drag-preview { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); border-radius: 0.5rem; }
    .cdk-drag-placeholder { opacity: 0.3; }
    .cdk-drag-animating { transition: transform 200ms cubic-bezier(0, 0, 0.2, 1); }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CakeToppersDay {
  private svc = inject(CakeToppersService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private translate = inject(TranslateService)
  private modals = inject(OrderModals)

  search = signal('')
  columns = STATUS_COLUMNS
  readonly columnClass = columnClass
  readonly statusKey = statusKey

  private params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap })

  /** Day shown (`/orders/day/:date`); an invalid date falls back to today. */
  date = computed(() => {
    const date = this.params().get('date')
    return isIso(date) ? date : todayIso()
  })

  weekStart = computed(() => mondayOf(this.date()))

  title = computed(() => {
    const text = new Intl.DateTimeFormat(this.translate.currentLang() ?? 'es', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).format(fromIso(this.date()))
    return text.charAt(0).toUpperCase() + text.slice(1)
  })

  /** Orders delivered on this day (and matching the search), grouped by status column. */
  byStatus = computed(() => {
    const q = this.search().toLowerCase()
    const groups = new Map<TopperOrderStatus, TopperOrder[]>(this.columns.map((c) => [c, []]))
    for (const order of this.svc.orders()) {
      if (order.deliveryDate !== this.date()) continue
      if (q && !order.clientName.toLowerCase().includes(q) && !order.description.toLowerCase().includes(q)) continue
      groups.get(order.status)?.push(order)
    }
    return groups
  })

  total = computed(() => [...this.byStatus().values()].reduce((n, list) => n + list.length, 0))

  goToDay(iso: string) {
    this.router.navigate(['/cake-toppers/orders/day', iso])
  }

  shiftDay(days: number) {
    this.goToDay(addDays(this.date(), days))
  }

  drop(event: CdkDragDrop<TopperOrderStatus, TopperOrderStatus, TopperOrder>) {
    if (event.previousContainer === event.container) return
    this.svc.moveOrder(event.item.data, event.container.data)
  }

  openNewModal() {
    this.modals.openNew(this.date())
  }

  openEditModal(order: TopperOrder) {
    this.modals.openEdit(order)
  }

  protected today = todayIso
}
