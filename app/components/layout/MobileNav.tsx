import { useState, useEffect, useId, forwardRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Link } from 'react-router'
import { ChevronDown, X, Menu } from 'lucide-react'
// import { FocusTrap } from 'focus-trap-react';

import { cn } from '~/utils'
import { collections } from '~/seed'

export function MobileNav({
  className
}: {
  className?: string
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const drawerId = useId()

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <nav
      role="navigation"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsMenuVisible(false)
        }
      }}
      className={cn([

      ], className)}>
      <button
        aria-controls={drawerId}
        aria-expanded={isMenuVisible}
        className={cn([

        ])}
        onClick={() => setIsMenuVisible(true)}
      >
        <Menu />
      </button>
      <MobileNavDrawer
        animationDuration={.3}
        isVisible={isMenuVisible}
        id={drawerId}
        onOverlayClickHandler={() => setIsMenuVisible(false)}
      />
    </nav>
  )
}
MobileNav.displayName = "MobileNav"

const MobileNavDrawer = ({
  className,
  animationDuration = 0.3,
  isVisible,
  id,
  onOverlayClickHandler,
}: {
  className?: string,
  animationDuration?: number,
  isVisible: boolean,
  id: string,
  onOverlayClickHandler?: () => void
}) => {
  const [isFocusTrapReady, setIsFocusTrapReady] = useState(false)

  function handleAnimationComplete(definition: any) {
    if (definition === "visible") {
      setIsFocusTrapReady(true)
    } else {
      setIsFocusTrapReady(false)
    }
  }

  const fadeInOut = {
    hidden: {
      display: 'none',
      opacity: 0,
      transition: {
        display: { delay: animationDuration / 2 },
        opacity: { duration: animationDuration / 2 },
      }
    },
    visible: {
      display: 'block',
      opacity: 1,
      transition: {
        opacity: { duration: animationDuration / 2 },
      }
    },
  }

  const drawerSlideInOut = {
    hidden: {
      x: "-100%",
      transitionEnd: {
        display: "none"
      },
      transition: {
        x: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    },
    visible: {
      display: "block",
      x: "0%",
      opacity: 1,
      transition: {
        x: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    }
  } satisfies Variants

  return (
    <>
      <motion.button className={cn([
        'fixed',
        'inset-0',
        'bg-black/50',
      ])}
        onClick={onOverlayClickHandler}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeInOut}
      >
      </motion.button>
   
        <motion.div
          id={id}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={drawerSlideInOut}
          onAnimationComplete={handleAnimationComplete}
          aria-hidden={!isVisible}
          className={cn([
            'fixed',
            'inset-y-0',
            'left-0',
            'bg-neutral-950',
            'z-20',
            'w-[clamp(240px,50vw,280px)]',
            'overflow-auto',
            'border-r',
            'border-white/20',
          ], className)}
        >
          <div className={cn([
          ])}>
            <nav>
              <ul>
                {collections.map((collection, index) => (
                  <MobileNavDrawerItem
                    key={collection.url}
                    title={collection.title}
                    url={collection.url}
                    subItems={collection.subItems}
                  />
                ))}
                <MobileNavDrawerItem
                  title="Posts"
                  url="/posts"
                />
              </ul>
            </nav>
          </div>
        </motion.div>
    </>
  )
}
MobileNavDrawer.displayName = 'MobileNavDrawer'

type SubMenuItem = {
  title: string
  url?: string
  subItems?: SubMenuItem[] | undefined
}

const MobileNavDrawerItem = ({
  title,
  url,
  subItems
}: {
  title: string,
  url?: string,
  subItems?: SubMenuItem[] | undefined
}) => {
  const [isSubItemsVisible, setIsSubItemsVisible] = useState(false)
  const subMenuId = useId()

  const BUTTON_ANIMATION_DURATION = 0.1
  const scaleInOut = {
    hidden: {
      display: 'none',
      opacity: 0,
      scale: 0,
      transition: {
        display: { delay: BUTTON_ANIMATION_DURATION },
        scale: { duration: BUTTON_ANIMATION_DURATION },
      }
    },
    visible: {
      display: 'block',
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: BUTTON_ANIMATION_DURATION },
        scale: { duration: BUTTON_ANIMATION_DURATION },
      }
    },
  }

  const SUBMENU_ANIMATION_DURATION = 0.2
  const slideInOut = {
    hidden: {
      height: 0,
      display: 'none',
      transition: {
        display: { delay: SUBMENU_ANIMATION_DURATION },
        height: { duration: SUBMENU_ANIMATION_DURATION },
        ease: 'easeOut'
      }
    },
    visible: {
      height: "auto",
      display: 'block',
      transition: {
        height: { duration: SUBMENU_ANIMATION_DURATION },
        ease: 'easeOut'
      }
    },
  } satisfies Variants

  return (
    <li
      className={cn([
        'relative',
        'border-b',
        'last:border-none',
        'border-white/20',
        'tracking-wider'
      ])}>
      {
        subItems
          ? (
            <>
              <div className={cn([
                'relative'
              ])}>
                {
                  url ? (
                    <Link
                      className={cn([
                        'block',
                        'py-3',
                        'pl-4',
                        'pr-11',
                        'uppercase',
                        'transition-all',
                        isSubItemsVisible ? 'text-primary font-semibold' : 'text-white/80'
                      ])}
                      to={`${url}`}>
                      {title}
                    </Link>
                  ) : (
                    <button
                      className={cn([
                        'block',
                        'py-3',
                        'pl-4',
                        'pr-11',
                        'uppercase',
                        'transition-all',
                        isSubItemsVisible ? 'text-primary font-semibold' : 'text-white/80'
                      ])}
                      onClick={() => setIsSubItemsVisible(!isSubItemsVisible)}
                    >
                      {title}
                    </button>
                  )
                }
                <motion.button
                  onClick={() => setIsSubItemsVisible(!isSubItemsVisible)}
                  aria-expanded={isSubItemsVisible}
                  aria-controls={subMenuId}
                  aria-label={isSubItemsVisible ? `Close ${title} submenu` : `Open ${title} submenu`}
                  className={cn([
                    'flex',
                    'justify-center',
                    'items-center',
                    'inset-y-0',
                    'absolute',
                    'right-0',
                    'aspect-square',
                    'border-l',
                    'border-white/20',
                    'transition-colors',
                    'text-white',
                    'h-full',
                    isSubItemsVisible ? 'bg-primary' : 'bg-transparent'
                  ])}>
                  <motion.span
                    className={cn([
                      'absolute',
                    ])}
                    initial="visible"
                    animate={isSubItemsVisible ? "hidden" : "visible"}
                    variants={scaleInOut}
                  >
                    <ChevronDown />
                  </motion.span>
                  <motion.span
                    className={cn([
                      'absolute'
                    ])}
                    initial="visible"
                    animate={isSubItemsVisible ? "visible" : "hidden"}
                    variants={scaleInOut}
                  >
                    <X />
                  </motion.span>
                </motion.button>
              </div>
              <motion.ul
                id={subMenuId}
                variants={slideInOut}
                initial="hidden"
                animate={isSubItemsVisible ? "visible" : "hidden"}
                className={cn([
                  'bg-white/10',
                  'overflow-hidden'
                ])}
              >
                {subItems.map((subItem, index) => (
                  <MobileNavDrawerItem
                    key={index}
                    title={subItem.title}
                    url={subItem.url}
                    subItems={subItem.subItems}
                  />
                ))}
              </motion.ul>
            </>
          ) : (
            <>
              <Link
                className={cn([
                  'block',
                  'text-white/80',
                  'hover:text-white',
                  'focus:text-white',
                  'py-3',
                  'pl-4',
                  'pr-11',
                  'uppercase'
                ])}
                to={`${url}`}>
                {title}
              </Link>
            </>
          )
      }
    </li>
  )
}