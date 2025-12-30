export const collections = [
  {
    title: "Front Page",
    url: "/search/frontpage"
  },
  {
    title: "Computers",
    url: "/computers",
    subItems: [
      {
        title: "Laptops",
        url: "/laptops",
        subItems: [
          { title: "Gaming Laptops", url: "/gaming-laptops" },
          { title: "Business Laptops", url: "/business-laptops" },
          {
            'title': '2-in-1 Laptops',
            url: "/2-in-1-laptops",
            subItems: [
              { title: "Windows", url: "/windows" },
              { title: "Chromebooks", url: "/chromebooks" }
            ]
          },
          { title: "Chromebooks", url: "/chromebooks" },
          {
            title: "Not A Link", subItems: [
              { title: "Sub Item 1", url: "/sub-item-1" },
              { title: "Sub Item 2", url: "/sub-item-2" },
              {
                title: "Sub Item 3", url: "/sub-item-3", subItems: [
                  { title: "Sub Sub Item 1", url: "/sub-sub-item-1" },
                  { title: "Sub Sub Item 2", url: "/sub-sub-item-2" },
                  { title: "Sub Sub Item 3", url: "/sub-sub-item-3" }
                ]
              }
            ]
          }
        ]
      },
      { title: "Desktops", url: "/desktops" },
      { title: "Monitors", url: "/monitors" },
      { title: "Tablets", url: "/tablets" }
    ]
  },
  { title: "Smartphones", url: "/smartphones" },
  { title: "TVs", url: "/tvs" },
  { title: "Cameras", url: "/cameras" },
  { title: "Headphones", url: "/headphones" },
  { title: "Gaming", url: "/gaming" }
]

export const blogPages = [
  { title: "News", url: "/blog/news" },
  { title: "Reviews", url: "/blog/reviews" },
  { title: "Guides", url: "/blog/guides" },
  { title: "Features", url: "/blog/features" }
]

export const socialLinks = [
  { title: "Facebook", url: "https://www.facebook.com" },
  { title: "X", url: "https://www.x.com" },
  { title: "Instagram", url: "https://www.instagram.com" },
  { title: "LinkedIn", url: "https://www.linkedin.com" }
]

export const footerData = [
  {
    title: "Our Stories",
    links: [
      { title: "About", url: "/about" },
      { title: "Careers", url: "/careers" },
      { title: "Press", url: "/press" },
      { title: "Contact", url: "/contact" }
    ]
  },
  {
    title: "Information",
    links: [
      { title: "Shipping", url: "/shipping" },
      { title: "Returns", url: "/returns" },
      { title: "Support", url: "/support" },
      { title: "FAQ", url: "/faq" }
    ]
  },
  {
    title: "Useful Links",
    links: [
      { title: "Privacy", url: "/privacy" },
      { title: "Terms", url: "/terms" },
      { title: "Cookies", url: "/cookies" },
      { title: "Privacy", url: "/privacy" },
      { title: "Terms", url: "/terms" },
      { title: "Cookies", url: "/cookies" }
    ]
  },
  {
    title: "Footer Menu",
    links: [
      { title: "Link 1", url: "/link-1" },
      { title: "Link 2", url: "/link-2" },
      { title: "Link 3", url: "/link-3" },
      { title: "Link 4", url: "/link-4" }
    ]
  }
]