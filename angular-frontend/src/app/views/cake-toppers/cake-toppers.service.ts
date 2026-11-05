import { inject, Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { environment } from '@/environments/environment'

export type TopperOrderStatus = 'Por Hacer' | 'En Progreso' | 'Entregado' | 'Pagado' | 'A Crédito' | 'Completado'

export type TopperOrder = {
  id: number
  description: string
  clientName: string
  createdAt: string
  deliveryDate: string
  status: TopperOrderStatus
  price?: number | null
  hasDelivery: boolean
  deliveryCost?: number
  isPaid: boolean
  isCredit: boolean
  creditExpiration?: string
}

export type TopperOrderInput = Omit<TopperOrder, 'id' | 'createdAt'>

@Injectable({ providedIn: 'root' })
export class CakeToppersService {
  private http = inject(HttpClient)
  private api = `${environment.apiUrl}/api`

  orders = signal<TopperOrder[]>([])

  constructor() {
    this.loadOrders()
  }

  loadOrders(): void {
    this.http.get<TopperOrder[]>(`${this.api}/topper-orders`)
      .subscribe(data => this.orders.set(data))
  }

  createOrder(data: TopperOrderInput): Observable<unknown> {
    return this.http.post(`${this.api}/topper-orders`, data).pipe(tap(() => this.loadOrders()))
  }

  updateOrder(id: number, data: TopperOrderInput): Observable<unknown> {
    return this.http.put(`${this.api}/topper-orders/${id}`, data).pipe(tap(() => this.loadOrders()))
  }

  /**
   * Moves an order to another status column, keeping its payment flags consistent with the new status.
   * Updates the list immediately and rolls back if the API call fails (see `persist`).
   */
  moveOrder(order: TopperOrder, status: TopperOrderStatus): void {
    this.persist({ ...order, status, ...this.paymentFor(status) })
  }

  /** Moves an order to another delivery date (calendar day). Same optimistic update / rollback as `moveOrder`. */
  moveOrderToDate(order: TopperOrder, deliveryDate: string): void {
    this.persist({ ...order, deliveryDate })
  }

  private persist(updated: TopperOrder): void {
    const previous = this.orders()
    this.orders.set(previous.map(o => (o.id === updated.id ? updated : o)))
    const { id, createdAt, ...body } = updated
    this.http.put(`${this.api}/topper-orders/${id}`, body).subscribe({
      error: () => this.orders.set(previous),
    })
  }

  private paymentFor(status: TopperOrderStatus): Partial<TopperOrder> {
    switch (status) {
      case 'Pagado':
      case 'Completado':
        return { isPaid: true, isCredit: false, creditExpiration: undefined }
      case 'A Crédito':
        return { isPaid: false, isCredit: true }
      default:
        return {}
    }
  }
}
