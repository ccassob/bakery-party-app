import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { TopperOrder, TopperOrderInput, TopperOrderStatus } from '../cake-toppers.service'

@Component({
  selector: 'app-edit-order-modal',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './edit-order-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditOrderModal {
  activeModal = inject(NgbActiveModal)

  readonly statuses: TopperOrderStatus[] = ['Por Hacer', 'En Progreso', 'Entregado', 'Pagado', 'A Crédito', 'Completado']

  createdAt = ''
  deliveryDate = ''
  description = ''
  clientName = ''
  status: TopperOrderStatus = 'Por Hacer'
  price: number | null = null
  hasDelivery = false
  deliveryCost: number | null = null
  isPaid = false
  isCredit = false
  creditExpiration = ''

  isEdit = false

  @Input()
  set order(value: TopperOrder) {
    this.isEdit = true
    this.createdAt = value.createdAt
    this.deliveryDate = value.deliveryDate
    this.description = value.description
    this.clientName = value.clientName
    this.status = value.status
    this.price = value.price ?? null
    this.hasDelivery = value.hasDelivery
    this.deliveryCost = value.deliveryCost ?? null
    this.isPaid = value.isPaid
    this.isCredit = value.isCredit
    this.creditExpiration = value.creditExpiration ?? ''
  }

  get isValid(): boolean {
    return !!this.description.trim() && !!this.clientName.trim() && !!this.deliveryDate && (this.price === null || this.price >= 0)
  }

  statusKey(status: string): string {
    return 'status.' + status.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ /g, '_')
  }

  confirm() {
    if (!this.isValid) return
    const data: TopperOrderInput = {
      description: this.description.trim(),
      clientName: this.clientName.trim(),
      deliveryDate: this.deliveryDate,
      status: this.status,
      price: this.price ?? undefined,
      hasDelivery: this.hasDelivery,
      deliveryCost: this.hasDelivery && this.deliveryCost ? this.deliveryCost : undefined,
      isPaid: this.isPaid,
      isCredit: !this.isPaid && this.isCredit,
      creditExpiration: !this.isPaid && this.isCredit && this.creditExpiration ? this.creditExpiration : undefined,
    }
    this.activeModal.close(data)
  }
}
