import bgImage from '/collection-navigation-bg-jeans.webp'
import { motion, type Variants } from 'framer-motion'
import { Container } from "~/components/shared/Container"
import BackButton from '~/components/BackButton'
import { collections } from '~/seed'
import { cn } from "~/utils"
import { Link, useLocation} from 'react-router'
import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

export const CollectionNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const mobileCategoriesId = useId()
  const drawerRef = useRef<any>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef?.current?.contains(event.target)) {
        setIsExpanded(false)
      }
    }

    // Attach the listeners on mount
    document.addEventListener('click', handleClickOutside)
    // Detach the listeners on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [drawerRef])

  const SUBMENU_ANIMATION_DURATION = 0.1
  const slideInOut = {
    hidden: {
      opacity: 0,
      display: 'none',
      transition: {
        display: { delay: SUBMENU_ANIMATION_DURATION },
        opacity: { duration: SUBMENU_ANIMATION_DURATION },
        ease: 'easeOut'
      }
    },
    visible: {
      opacity: 1,
      display: 'block',
      transition: {
        opacity: { duration: SUBMENU_ANIMATION_DURATION },
        ease: 'easeOut'
      }
    },
  } satisfies Variants

  return (
    <div className={cn([
      'relative',
      'text-dark-foreground'
    ])}>
      <img
        alt="jeans background"
        src={bgImage}
        className="object-cover inset-0 h-full w-full absolute"
      />
      <div className={cn([
        'absolute',
        'inset-0',
        'bg-black',
        'opacity-50'
      ])}></div>
      <Container className="relative">
        <div className={cn([
          'flex',
          'py-3',
          'lg:py-4',
          'justify-between',
          'items-center'
        ])}>
          <div className={cn([
            'flex',
            'items-center',
            'flex-1',
          ])}>
            <BackButton />
          </div>
          <nav
            role="navigation"
            aria-label="Collection Navigation"
            className={cn([
              'hidden',
              'lg:flex',
              'flex-1',
              'justify-center',
              'items-center',
            ])}
          >
            <ul
              className={cn([
                'flex',
                'space-x-4',
                'justify-center',
                'items-center',
                'mr-auto',
                'uppercase',
                'tracking-wider'
              ])}>
              {collections.map((collection, i) => (
                <CollectionNavigationLink
                  href={`${collection.url}`}
                  key={collection.url}
                >
                  {collection.title}
                </CollectionNavigationLink>
              ))}
            </ul>
          </nav>
          <div
            ref={drawerRef}
            className={cn([
              'flex',
              'lg:hidden',
              'flex-1',
              'justify-center',
              'items-center',
              'relative'
            ])}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls={mobileCategoriesId}
              className={cn([
                'flex',
                'gap-x-1',
                'items-center',
                'uppercase',
                'tracking-widest',
                'font-semibold',
                'leading-none'
              ])}>
              <span>
                Categories
              </span>
              <span
                className={cn([
                  'transition-transform',
                  isExpanded ? '-rotate-180' : ''
                ])}
              >
                <ChevronDown />
              </span>
            </button>
            <motion.nav
              role="navigation"
              aria-label="Mobile Collection Navigation"
              id={mobileCategoriesId}
              aria-hidden={!isExpanded}
              variants={slideInOut}
              initial="hidden"
              animate={isExpanded ? "visible" : "hidden"}
              className={cn([
                'absolute',
                'top-[calc(150%)]',
                'left-1/2',
                '-translate-x-1/2',
                'bg-white',
                'shadow-md',
                'text-black',
                'text-left',
                'overflow-hidden',
                'uppercase',
                'z-10'
              ])}
            >
              <ul className={cn([
                'p-8',
                'space-y-1',
              ])}>
                {collections.map((collection, i) => (
                  <li key={collection.url}>
                    <Link
                      className={cn([
                        'hover:text-primary',
                        'transition-colors'
                      ])}
                      to={`${collection.url}`}
                    >
                      {collection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </div>
          <div className="flex-1"></div>
        </div>
      </Container>
    </div>
  )
}
CollectionNavigation.displayName = "CollectionNavigation"

const CollectionNavigationLink = ({ href, children }: { href: string, children: string }) => {

  // Animation approach from:
  // https://nerdcowboy.com/blog/sliding-underlined-links/

const { pathname: currentPath } = useLocation()

  return (
    <li className={cn([
      'flex-[0_0_auto]'
    ])}>
      <Link
        to={href}
        className={cn([
          'py-[.4rem]',
          'bg-[linear-gradient(currentColor,currentColor)]',
          'bg-size-[0%_0.15em]',
          'bg-position-[100%_100%]',
          'bg-no-repeat',
          'hover:bg-size-[100%_0.15em]',
          'hover:bg-position-[0%_100%]',
          currentPath === href ? 'bg-size-[100%_0.15em] bg-position-[0%_100%]' : '',
        ])}
        style={{
          transition: 'background-size 0.2s ease-in-out'
        }}
      >
        {children}
      </Link>
    </li>
  )
}

export default CollectionNavigation