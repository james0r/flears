import { cn } from '~/utils'
import { Link } from 'react-router'


export const HeaderNav = () => {

  const mockHeaderLinks = [
    { label: 'Home', href: '/', _type: 'link' },
    { label: 'About', href: '/about', _type: 'link' },
    { label: 'Services', href: '/services', _type: 'link' },
    { label: 'Contact', href: '/contact', _type: 'link' },
  ]

  const headerMenuLinks = mockHeaderLinks

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
        {mockHeaderLinks && mockHeaderLinks.map((link: any, index: number) => (
          <li
            className={topLevelListItem}
            key={index}>
            <Link to={link} />
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
  'tracking-wider'
])

const topLevelButton = cn([
  'flex',
  'gap-2',
  'items-center',
  'h-full'
])