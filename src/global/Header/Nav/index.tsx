'use client'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

import type { Header } from '@/payload-types'
import RichText from '@/components/RichText' // adjust path if needed

interface HeaderNavProps {
  navItems: NonNullable<Header['navItems']>
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ navItems }) => {
  return (
    <NavigationMenu className="w-full justify-between">
      <NavigationMenuList>
        {navItems.map((navItem, idx) => {
          const children = Array.isArray(navItem.children) ? navItem.children : []
          const hasChildren = children.length > 0
          return (
            <NavigationMenuItem key={navItem.id || idx}>
              {hasChildren ? (
                <>
                  <NavigationMenuTrigger>{navItem.link.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-4 p-4 min-w-[500px]">
                      {children.map((c, cidx) =>
                        c && c.item && c.item.link ? (
                          <div
                            key={c.id || cidx}
                            className="rounded-lg bg-muted/50 p-4 hover:bg-muted transition-colors"
                          >
                            <NavigationMenuLink
                              href={c.item.link.url || '#'}
                              className="block font-semibold text-foreground mb-1"
                            >
                              {c.item.link.label || 'Submenu'}
                            </NavigationMenuLink>
                            {(c.item as any).menuContent && (
                              <div className="text-sm text-muted-foreground line-clamp-3">
                                <RichText data={(c.item as any).menuContent} enableProse={false} />
                              </div>
                            )}
                          </div>
                        ) : null,
                      )}
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  href={navItem.link.url || '#'}
                  className="px-4 py-2 rounded hover:bg-accent focus:bg-accent text-foreground"
                >
                  {navItem.link.label}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
