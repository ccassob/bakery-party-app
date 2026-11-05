import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '@ngx-translate/core'

type StatCard = { label: string; value: string; icon: string; change: string; up: boolean }

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './dashboard.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {
  stats: StatCard[] = [
    { label: "Today's Orders", value: '24', icon: 'shopping-bag', change: '+3 since yesterday', up: true },
    { label: "Today's Revenue", value: '$1,248', icon: 'currency-dollar', change: '+12% vs last week', up: true },
    { label: 'Upcoming Events', value: '6', icon: 'calendar-event', change: '2 this weekend', up: true },
    { label: 'Menu Items', value: '38', icon: 'tools-kitchen-2', change: '2 out of stock', up: false },
  ]

  recentOrders = [
    { id: '#ORD-001', customer: 'Sarah Johnson', item: 'Custom Birthday Cake', status: 'Ready', date: 'Jun 11' },
    { id: '#ORD-002', customer: 'Mike Thompson', item: 'Cupcake Box (12)', status: 'Baking', date: 'Jun 11' },
    { id: '#ORD-003', customer: 'Emily Davis', item: 'Wedding Cake Tasting', status: 'Pending', date: 'Jun 12' },
    { id: '#ORD-004', customer: 'James Wilson', item: 'Party Pack — Assorted', status: 'Ready', date: 'Jun 12' },
    { id: '#ORD-005', customer: 'Anna Lee', item: 'Graduation Cake', status: 'Baking', date: 'Jun 13' },
  ]

  upcomingEvents = [
    { name: "Emma's Birthday Party", date: 'Jun 14', guests: 20, notes: 'Rainbow cake + 20 cupcakes' },
    { name: 'Thompson Wedding Tasting', date: 'Jun 15', guests: 4, notes: 'Vanilla & lemon samples' },
    { name: 'Office Celebration', date: 'Jun 17', guests: 35, notes: 'Sheet cake, nut-free' },
  ]

  statusClass(status: string): string {
    return (
      {
        Ready: 'bg-success-subtle text-success',
        Baking: 'bg-warning-subtle text-warning',
        Pending: 'bg-secondary-subtle text-secondary',
      }[status] ?? 'bg-light text-dark'
    )
  }
}
