import type { LucideProps } from 'lucide-react'
import {
  Blocks,
  Image,
  Palette,
  PencilIcon,
  Settings,
  ShoppingCart,
  Tag,
  UserRound,
} from 'lucide-react'
import type { ExoticComponent } from 'react'

const navIconMap = {
  categories: Image,
  content: PencilIcon,
  customers: UserRound,
  design: Palette,
  orders: ShoppingCart,
  plugins: Blocks,
  products: Tag,
  settings: Settings,
}

type NavIconSlug = keyof typeof navIconMap

export const getNavIcon = (slug: NavIconSlug): ExoticComponent<LucideProps> | undefined => {
  return navIconMap[slug]
}
