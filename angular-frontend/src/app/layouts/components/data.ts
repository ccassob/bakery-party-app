import { MenuItemType } from '@/app/types'

export const menuItems: MenuItemType[] = [
  {
    icon: 'dashboard',
    slug: 'main',
    label: 'nav.main',
    isTitle: true,
    children: [
      {
        url: '/dashboard',
        slug: 'dashboard',
        label: 'nav.dashboard',
        icon: 'dashboard',
      },
    ],
  },
  {
    icon: 'cake',
    slug: 'cake-toppers',
    label: 'nav.cakeToppers',
    isTitle: true,
    children: [
      {
        url: '/cake-toppers/orders',
        slug: 'cake-toppers-orders',
        label: 'nav.orders',
        icon: 'shopping-bag',
      },
    ],
  },
]
