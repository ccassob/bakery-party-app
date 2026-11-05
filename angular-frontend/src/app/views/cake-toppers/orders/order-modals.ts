import { inject, Injectable } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CakeToppersService, TopperOrder } from '../cake-toppers.service'
import { EditOrderModal } from '../edit-order-modal/edit-order-modal'

/** Opens the create / edit order modal and saves the result; shared by the week and day views. */
@Injectable({ providedIn: 'root' })
export class OrderModals {
  private svc = inject(CakeToppersService)
  private modalService = inject(NgbModal)

  openNew(deliveryDate = '') {
    const ref = this.modalService.open(EditOrderModal, { size: 'lg', backdrop: 'static', centered: true })
    ref.componentInstance.deliveryDate = deliveryDate
    ref.result.then(
      (data) => { this.svc.createOrder(data).subscribe() },
      () => {}
    )
  }

  openEdit(order: TopperOrder) {
    const ref = this.modalService.open(EditOrderModal, { size: 'lg', backdrop: 'static', centered: true })
    ref.componentInstance.order = order
    ref.result.then(
      (data) => { this.svc.updateOrder(order.id, data).subscribe() },
      () => {}
    )
  }
}
