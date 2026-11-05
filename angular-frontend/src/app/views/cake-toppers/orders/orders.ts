import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { CakeToppersService, TopperOrder } from '../cake-toppers.service'
import { OrderCard } from './order-card/order-card'
import { OrderModals } from './order-modals'
import { addDays, fromIso, isIso, mondayOf, todayIso } from './order-utils'

@Component({
  selector: 'app-cake-toppers-orders',
  imports: [FormsModule, RouterLink, TranslatePipe, CdkDropListGroup, CdkDropList, CdkDrag, OrderCard],
  templateUrl: './orders.html',
  styles: `
    .week-grid { display: grid; grid-template-columns: repeat(7, minmax(190px, 1fr)); gap: 0.75rem; overflow-x: auto; }
    .day-list { min-height: 120px; max-height: calc(100vh - 360px); overflow-y: auto; }
    .day-card { cursor: pointer; }
    .day-today { outline: 2px solid var(--theme-primary); }
    .day-number { font-size: 1.75rem; }
    .day-link {
      background: var(--theme-secondary-bg);
      border: 1px solid var(--theme-border-color);
      color: var(--theme-body-color);
      transition: background-color 0.15s, color 0.15s, border-color 0.15s;
    }
    .day-link .day-count { background: var(--theme-tertiary-bg); color: var(--theme-secondary-color); }
    .day-link-today { border-color: var(--theme-primary); color: var(--theme-primary); }
    .day-link:hover, .day-link:focus-visible {
      background: var(--theme-primary);
      border-color: var(--theme-primary);
      color: #fff;
    }
    .day-link:hover .day-count, .day-link:focus-visible .day-count { background: rgba(255, 255, 255, 0.25); color: #fff; }
    .cdk-drag-preview { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); border-radius: 0.5rem; }
    .cdk-drag-placeholder { opacity: 0.3; }
    .cdk-drag-animating { transition: transform 200ms cubic-bezier(0, 0, 0.2, 1); }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CakeToppersOrders {
  private svc = inject(CakeToppersService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private translate = inject(TranslateService)
  private modals = inject(OrderModals)

  search = signal('')
  today = todayIso()

  private query = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap })

  /** Monday of the visible week; the URL (`?week=`) is the source of truth so "back" keeps the week. */
  weekStart = computed(() => {
    const week = this.query().get('week')
    return mondayOf(isIso(week) ? week : todayIso())
  })

  private lang = computed(() => this.translate.currentLang() ?? 'es')

  filtered = computed(() => {
    const q = this.search().toLowerCase()
    return this.svc
      .orders()
      .filter((o) => !q || o.clientName.toLowerCase().includes(q) || o.description.toLowerCase().includes(q))
  })

  days = computed(() => {
    const weekday = new Intl.DateTimeFormat(this.lang(), { weekday: 'short' })
    const orders = this.filtered()
    return Array.from({ length: 7 }, (_, i) => {
      const iso = addDays(this.weekStart(), i)
      const date = fromIso(iso)
      return {
        iso,
        weekday: weekday.format(date),
        dayNumber: date.getDate(),
        isToday: iso === this.today,
        orders: orders
          .filter((o) => o.deliveryDate === iso)
          .sort((a, b) => a.clientName.localeCompare(b.clientName)),
      }
    })
  })

  outsideWeek = computed(() => this.filtered().length - this.days().reduce((n, d) => n + d.orders.length, 0))

  rangeLabel = computed(() => {
    const day = new Intl.DateTimeFormat(this.lang(), { day: 'numeric', month: 'short' })
    const start = fromIso(this.weekStart())
    const end = fromIso(addDays(this.weekStart(), 6))
    return `${day.format(start)} – ${day.format(end)} ${end.getFullYear()}`
  })

  goToWeek(iso: string) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { week: mondayOf(iso) } })
  }

  shiftWeek(weeks: number) {
    this.goToWeek(addDays(this.weekStart(), weeks * 7))
  }

  drop(event: CdkDragDrop<string, string, TopperOrder>) {
    if (event.previousContainer === event.container) return
    this.svc.moveOrderToDate(event.item.data, event.container.data)
  }

  openNewModal() {
    this.modals.openNew()
  }

  /** A click that ends a drag must not open the editor. */
  private dragging = false

  onDragStarted() {
    this.dragging = true
  }

  onDragEnded() {
    setTimeout(() => (this.dragging = false))
  }

  openEditModal(order: TopperOrder) {
    if (this.dragging) return
    this.modals.openEdit(order)
  }
}
