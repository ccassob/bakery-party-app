import { TopperOrder, TopperOrderStatus } from '../cake-toppers.service'

export type DisplayStatus = TopperOrderStatus | 'Expirado'

export const STATUS_COLUMNS: TopperOrderStatus[] = [
  'Por Hacer', 'En Progreso', 'Entregado', 'Pagado', 'A Crédito', 'Completado',
]

const pad = (n: number) => String(n).padStart(2, '0')

/** Local-time ISO date (YYYY-MM-DD). `toISOString()` would use UTC and can return the wrong day at night. */
export function toIso(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function fromIso(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function isIso(value: string | null | undefined): value is string {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(fromIso(value).getTime())
}

export const todayIso = () => toIso(new Date())

export function addDays(iso: string, days: number): string {
  const d = fromIso(iso)
  d.setDate(d.getDate() + days)
  return toIso(d)
}

/** Monday of the week that contains the given date. */
export function mondayOf(iso: string): string {
  const d = fromIso(iso)
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return toIso(d)
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function statusKey(status: string): string {
  return 'status.' + status.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ /g, '_')
}

export function effectiveStatus(order: TopperOrder): DisplayStatus {
  if (order.isCredit && !order.isPaid && order.creditExpiration && order.creditExpiration < todayIso()) {
    return 'Expirado'
  }
  return order.status
}

export function columnClass(status: TopperOrderStatus): string {
  const map: Record<TopperOrderStatus, string> = {
    'Por Hacer': 'text-secondary',
    'En Progreso': 'text-primary',
    'Entregado': 'text-info',
    'Pagado': 'text-success',
    'A Crédito': 'text-warning',
    'Completado': 'text-dark',
  }
  return map[status]
}
