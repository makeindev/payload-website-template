'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import type { Header } from '@/payload-types'

interface HeaderNavProps {
  data: Header
}

type NavItem = NonNullable<Header['navItems']>[number]
type ChildItem = NonNullable<NonNullable<Header['navItems']>[number]['children']>[number]

function isChildItem(child: any): child is ChildItem {
  return (
    child &&
    typeof child === 'object' &&
    'item' in child &&
    child.item &&
    typeof child.item === 'object' &&
    'link' in child.item &&
    'id' in child
  )
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data }) => {
  const navItems = data.navItems || []
  // Track open state for each dropdown
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <nav className="flex items-center justify-between w-full p-4">
      <div className="flex gap-4 items-center">
        {navItems.map((navItemRaw, idx) => {
          const navItem = navItemRaw as NavItem
          const children = Array.isArray(navItem.children) ? navItem.children : []
          return (
            <DropdownMenu
              key={navItem.id || idx}
              open={openIdx === idx}
              onOpenChange={(open) => setOpenIdx(open ? idx : null)}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  className="px-3 py-2 rounded bg-transparent border-none hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  style={{ boxShadow: 'none' }}
                >
                  {navItem.link.label}
                </Button>
              </DropdownMenuTrigger>
              {children.length > 0 && (
                <DropdownMenuContent align="start" className="rounded-lg overflow-hidden">
                  {(() => {
                    const validChildren: any[] = []
                    for (const child of children) {
                      if (isChildItem(child)) validChildren.push(child)
                    }
                    return validChildren.map((c, cidx) => (
                      <DropdownMenuItem
                        key={(c as any).id || cidx}
                        asChild
                        onClick={() => setOpenIdx(null)}
                        className="px-3 py-2 rounded hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                      >
                        <a href={(c as any).item.link.url || '#'} className="text-foreground">
                          {(c as any).item.link.label || 'Submenu'}
                        </a>
                      </DropdownMenuItem>
                    ))
                  })()}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          )
        })}
      </div>
      <a
        href="/search"
        className="ml-auto flex items-center px-3 py-2 rounded hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 h-5 text-primary" />
      </a>
    </nav>
  )
}
