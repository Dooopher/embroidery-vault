'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  UploadCloud,
  Image as ImageIcon,
} from 'lucide-react'

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Upload',
    href: '/dashboard/upload',
    icon: UploadCloud,
  },
  {
    name: 'Gallery',
    href: '/dashboard/gallery',
    icon: ImageIcon,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">
          Embroidery Vault
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 ${
                isActive
                  ? 'bg-gray-100 font-medium'
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}