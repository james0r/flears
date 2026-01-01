import { cn } from '~/utils'
import { Link } from 'react-router'
import { ItemLabel } from '../ui/ItemLabel'

export const HeaderNav = () => {

  const mockHeaderLinks: HeaderLink[] = [
    { label: 'Home', href: '/', _type: 'link', featured: 'sale' },
    { label: 'About', href: '/about', _type: 'link' },
    { label: 'Services', href: '/services', _type: 'link' },
    { label: 'Contact', href: '/contact', _type: 'link', featured: 'new' },
  ]

  type HeaderLink = {
    label: string
    href: string
    _type: string
    featured?: 'sale' | 'hot' | 'new'
  }

  // Define the variants for the animation

  const FADE_IN_DURATION = 0.25

  const fadeInOut = {
    hidden: {
      display: 'none',
      opacity: 0,
      transition: {
        display: { delay: FADE_IN_DURATION },
        opacity: { duration: FADE_IN_DURATION },
      }
    },
    visible: {
      display: 'block',
      opacity: 1,
      transition: {
        opacity: { duration: FADE_IN_DURATION },
      }
    },
  }

  return (
    <nav
      role="navigation"
      className={cn([
        'mr-auto'
      ])}>
      <ul className={cn([
        'flex',
        'flex-wrap',
        'gap-x-4',
        '[&>li]:uppercase',
        'h-24',
        'items-centere'
      ])}>
        {mockHeaderLinks && mockHeaderLinks.map((link: HeaderLink, index: number) => (

          <li
            className={topLevelListItem}
            key={link.label}>
            <Link to={link.href}>
              {link.label}
            </Link>
            {
              link.featured && (
                <ItemLabel
                  variant={link.featured}
                  size="sm"
                  title={link.featured}
                />
              )
            }
          </li>
        ))}

      </ul>
    </nav>
  )
}

const topLevelListItem = cn([
  'flex',
  'items-center',
  'whitespace-nowrap',
  'font-semibold',
  'tracking-wider',
  'relative'
])

const topLevelButton = cn([
  'flex',
  'gap-2',
  'items-center',
  'h-full'
])