import { Suspense } from 'react'
import { Await, NavLink, useAsyncValue, Link } from 'react-router'
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen'
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated'
import { useAside } from '~/components/layout/Aside'
import { cn } from '~/utils'
import { Container } from '~/components/shared/Container'
import { HeaderNav } from '~/components/layout/HeaderNav'
import { ShoppingCart, Search } from "lucide-react"
import { MobileNav } from '~/components/layout/MobileNav'
import { CollectionNavigation } from '~/components/layout/CollectionNavigation'

interface HeaderProps {
  header: HeaderQuery
  cart: Promise<CartApiQueryFragment | null>
  isLoggedIn: Promise<boolean>
  publicStoreDomain: string
}

type Viewport = 'desktop' | 'mobile'

const mockHeaderLinks = [
  { label: 'Home', href: '/', _type: 'link' },
  { label: 'About', href: '/about', _type: 'link' },
  { label: 'Services', href: '/services', _type: 'link' },
  { label: 'Contact', href: '/contact', _type: 'link' },
]

export function HeaderFlears({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header
  return (
    <header className={cn([
      'bg-white',
      'text-neutral'
    ])}>
      <Container id="f-mega-menu-container">
        <div className={cn([
          'relative',
          'z-10',
          'flex',
          'items-center',
          'justify-between',
        ])}>
          <div className={cn([
            'hidden',
            'lg:flex',
            'justify-center',
            'items-center',
            'flex-1'
          ])}
          >
            <HeaderNav />
          </div>
          <div className={cn([
            'max-w-max'
          ])}>
            <div className={cn([
              'text-4xl',
              'font-bold',
              'font-raleway',
              'tracking-wider',
              'py-4'
            ])}>
              <Link to="/">
                FLEARS
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center flex-1">
            <div className={cn([
              'ml-auto',
              'flex',
              'items-center',
              'gap-x-6'
            ])}>
              <Link
                to="/search"
                className={cn([
                  'max-h-max'
                ])}>
                <Search size="20" />
              </Link>
              <button className={cn([
                'max-h-max'
              ])}>
                <ShoppingCart size="20" />
              </button>
              <MobileNav
                className={cn([
                  'block',
                  'lg:hidden',
                  'flex',
                  'items-center',
                ])}
              />
            </div>
          </div>
        </div>
      </Container>
      <CollectionNavigation />
    </header>
  )
}

export function HeaderMenuFlears({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu']
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url']
  viewport: Viewport
  publicStoreDomain: HeaderProps['publicStoreDomain']
}) {
  const className = `header-menu-${viewport}`
  const { close } = useAside()

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        )
      })}
    </nav>
  )
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  )
}

function HeaderMenuMobileToggle() {
  const { open } = useAside()
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  )
}

function SearchToggle() {
  const { open } = useAside()
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  )
}

function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside()
  const { publish, shop, cart, prevCart } = useAnalytics()

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault()
        open('cart')
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload)
      }}
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  )
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  )
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null
  const cart = useOptimisticCart(originalCart)
  return <CartBadge count={cart?.totalQuantity ?? 0} />
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean
  isPending: boolean
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  }
}
