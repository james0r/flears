import { Suspense } from 'react'
import { Await, NavLink, Link } from 'react-router'
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated'
import { cn, isLinkExternal } from '~/utils'
import { Container } from '../shared/Container'
import { SocialLinks } from '../shared/SocialLinks'
import { Visa, Mastercard, Paypal, Amex, Shopify } from "react-pay-icons"

interface FooterProps {
  footer: Promise<FooterQuery | null>
  header: HeaderQuery
  publicStoreDomain: string
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            <footer
              className={cn(["bg-neutral-950", "text-white"])}>
              <div
                className={cn([
                  "pt-16",
                  "lg:pt-14",
                  "pb-12",
                  "lg:pb-9",
                  "mx-auto",
                ])}
              >
                <Container>
                  <div
                    className={cn([
                      "text-4xl",
                      "font-semibold",
                      "font-raleway",
                      "tracking-wider",
                      "py-4",
                      "max-w-max",
                      "mx-auto",
                    ])}
                  >
                    <Link to="/">FLEARS</Link>
                  </div>
                  <div className={cn([
                    'mx-auto',
                    'max-w-max'
                  ])}>
                    <ul
                      className={cn([
                        "flex",
                        "gap-3",
                        "mx-auto",
                        "max-w-max",
                        "[&_.social-svg-icon]:fill-neutral-300!",
                        "[&_a:hover_.social-svg-icon]:fill-white!",
                      ])}
                    >
                      <SocialLinks
                        socialLinks={{
                          facebook: 'https://www.facebook.com/flearsstore',
                          instagram: 'https://www.instagram.com/flearsstore/',
                          x: 'https://x.com/flearsstore',
                          youtube: 'https://www.youtube.com/@flearsstore',
                        }} />
                    </ul>
                  </div>
                  <div
                    className={cn([
                      'grid',
                      'grid-cols-1',
                      'mx-auto',
                      'lg:w-full',
                      "lg:grid",
                      "lg:grid-cols-[1fr_30%]",
                      "mt-12",
                    ])}
                  >
                    <div className={cn([
                      'grid',
                      'grid-cols-2',
                      'w-[85vw]',
                      'max-w-90',
                      'sm:max-w-100',
                      'sm:pr-0',
                      'md:max-w-none',
                      'md:w-full',
                      'md:flex',
                      'md:justify-between',
                      'md:pr-8',
                      'lg:pr-0',
                      'lg:justify-around',
                      // 'lg:gap-4',
                      'mx-auto',
                    ])}>
                      {[
                        { header: 'CUSTOMER SERVICE' },
                        { header: 'INFORMATION' },
                        { header: 'POLICIES' },
                      ].map((column, index) => {
                        return (
                          <div
                            key={column.header}
                            className={cn([
                              'lg:flex-[0_0_auto]',
                              "tracking-wider",
                              'px-2',
                              "sm:px-4",
                              "mb-8",
                              'md:w-auto',
                              'even:ml-auto',
                              'even:mr-4',
                              'md:even:ml-0',
                              'md:even:mr-0',
                            ])}
                          >
                            <div className={cn([
                              'max-w-max',
                            ])}>
                              <FooterColumnHeader title={column.header} />

                              <ul className={cn(["space-y-2", "text-white/80"])}>
                                {[
                                  { title: 'Contact Us', url: '/contact' },
                                  { title: 'FAQ', url: '/pages/faq' },
                                  { title: 'Sizing Guide', url: '/pages/sizing-guide' },
                                  { title: 'Shipping & Returns', url: '/pages/shipping-returns' },
                                  { title: 'Google', url: 'https://www.google.com' },
                                ].map((link, index) => {
                                  return isLinkExternal({
                                    url: link.url,
                                    primaryDomainUrl: header.shop.primaryDomain.url,
                                    publicStoreDomain,
                                  }) ? (
                                    <li key={link.url}>
                                      <a
                                        className={cn([
                                          "hover:text-white",
                                          "transition-colors",
                                        ])}
                                        href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.title}
                                      </a>
                                    </li>
                                  ) : (
                                    <li key={index}>
                                      <Link
                                        className={cn([
                                          "hover:text-white",
                                          "transition-colors",
                                        ])}
                                        to={link.url} key={link.url}>
                                        {link.title}
                                      </Link>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                        )
                      })}
                      <div
                        className={cn([
                          'px-2',
                          "sm:px-4",
                          'col-span-2',
                          'block',
                          'md:hidden'
                        ])}
                      >
                        <FooterColumnHeader title="ABOUT THE STORE" />
                        <div className={cn(["text-white/80"])}>
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque dignissimos ducimus quia aut earum unde reprehenderit laudantium est rem ea!
                        </div>
                        <div className={cn(["flex", "gap-2", "mt-8"])}>
                          <Visa style={{ width: 40 }} />
                          <Mastercard style={{ width: 40 }} />
                          <Paypal style={{ width: 40 }} />
                          <Amex style={{ width: 40 }} />
                          <Shopify style={{ width: 40 }} />
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn([
                        "sm:px-4",
                        'hidden',
                        'md:block',
                        'md:w-3/4',
                        'lg:w-full',
                      ])}
                    >
                      <FooterColumnHeader title="ABOUT THE STORE" />
                      <div className={cn([
                        "text-white/80"
                      ])}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque dignissimos ducimus quia aut earum unde reprehenderit laudantium est rem ea!
                      </div>
                      <div className={cn(["flex", "gap-2", "mt-8"])}>
                        <Visa style={{ width: 40 }} />
                        <Mastercard style={{ width: 40 }} />
                        <Paypal style={{ width: 40 }} />
                        <Amex style={{ width: 40 }} />
                        <Shopify style={{ width: 40 }} />
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
              <div className={cn(["border-t", "border-white/20"])}>
                <Container>
                  <div
                    className={cn([
                      "text-center",
                      "py-4",
                      "text-white/80",
                    ])}
                  >
                    Lorem, ipsum dolor.
                  </div>
                </Container>
              </div>
            </footer>
          </footer>
        )}
      </Await>
    </Suspense>
  )
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu']
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url']
  publicStoreDomain: string
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url
        const isExternal = !url.startsWith('/')
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
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

const FooterColumnHeader = ({ title }: { title: string }) => {
  return (
    <div
      className={cn([
        "font-semibold",
        "uppercase",
        "mb-6",
        "after:content-['']",
        "after:block",
        "after:h-0.5",
        "after:w-10",
        "after:bg-white",
        "after:mt-1",
      ])}
    >
      {title}
    </div>
  )
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
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
    color: isPending ? 'grey' : 'white',
  }
}
